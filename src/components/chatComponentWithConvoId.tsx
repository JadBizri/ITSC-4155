import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import db from '~/lib/firebase';
import { sendMessage } from '~/services/firebaseServiceWithId';
import { useSession } from 'next-auth/react';

interface Props {
	conversationId: string;
}

function ChatComponentWithConvoId({ conversationId }: Props) {
	const { data: session } = useSession();
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
	const [otherUserId, setOtherUserId] = useState<string | null>(null);

	useEffect(() => {
		if (conversationId && db) {
			const messagesCollection = query(
				collection(db, `conversations/${conversationId}/messages`),
				orderBy('createdAt'),
			);

			const unsubscribeMessages = onSnapshot(messagesCollection, snapshot => {
				const loadedMessages = snapshot.docs.map(doc => ({
					id: doc.id,
					text: doc.data().text as string,
				}));
				setMessages(loadedMessages);
			});

			const conversationRef = doc(db, `conversations/${conversationId}`);
			void getDoc(conversationRef).then(docSnapshot => {
				const data = docSnapshot.data();
				if (data && session?.user?.id) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
					const otherId = data.participants.find((id: string) => id !== session.user.id) as string;
					setOtherUserId(otherId ?? null);
				}
			});

			return () => unsubscribeMessages();
		}
	}, [conversationId, session?.user?.id]);

	const handleSendMessage = async () => {
		if (message.trim() !== '' && session?.user?.id && otherUserId) {
			await sendMessage(message, session.user.id, otherUserId, conversationId);
			setMessage('');
		} else {
			console.error('Cannot send an empty message or missing user IDs.');
		}
	};

	return (
		<div className="rounded-lg bg-gray-800 p-4 shadow">
			<input
				value={message}
				onChange={e => setMessage(e.target.value)}
				className="mb-4 w-full rounded-lg bg-white p-2 text-gray-900"
				placeholder="Type a message..."
			/>
			<button
				onClick={handleSendMessage}
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				Send
			</button>
			<ul className="mt-4 space-y-2">
				{messages.map(msg => (
					<li key={msg.id} className="rounded bg-gray-700 p-2 text-white">
						{msg.text}
					</li>
				))}
			</ul>
		</div>
	);
}

export default ChatComponentWithConvoId;

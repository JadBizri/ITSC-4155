import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import db from '~/lib/firebase';
import { sendMessage } from '~/services/firebaseServiceWithId';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';

interface Props {
	conversationId: string;
}

function ChatComponentWithConvoId({ conversationId }: Props) {
	const { data: session } = useSession();
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<{ id: string; text: string; receiverId: string; senderId: string }[]>([]);
	const [otherUserId, setOtherUserId] = useState<string | null>(null);

	const currentUser = session?.user?.id;
	const userName = api.user.getUserNameById.useQuery(session?.user?.id ?? '');
	const otherName = api.user.getUserNameById.useQuery(otherUserId ?? '');

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
					receiverId: doc.data().receiverId as string,
					senderId: doc.data().senderId as string,
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
		<div className="mx-auto  rounded-lg  p-4 shadow-lg">
			<ul className="h-64 space-y-2 overflow-y-auto p-2">
				{messages.map(msg => (
					<li
						key={msg.id}
						className={`rounded-lg p-3 ${msg.senderId === currentUser ? 'bg-gray-100' : 'bg-gray-300'} my-2 text-gray-900`}
					>
						<div className="text-sm font-semibold">
							{msg.senderId === currentUser ? userName.data?.name : otherName.data?.name}
						</div>
						<div className="text-lg">{msg.text}</div>
					</li>
				))}
			</ul>
			<div className="mt-4 flex">
				<input
					value={message}
					onChange={e => setMessage(e.target.value)}
					className="flex-grow rounded-lg bg-gray-100 p-2 text-gray-900"
					placeholder="Type a message..."
				/>
				<button
					onClick={handleSendMessage}
					className="ml-2 rounded bg-gray-800 px-4 py-2 text-white transition duration-150 hover:bg-gray-700"
				>
					Send
				</button>
			</div>
		</div>
	);
}

export default ChatComponentWithConvoId;

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import db from '~/lib/firebase';
import { sendMessage } from '~/services/firebaseServiceWithId';
import { useSession } from 'next-auth/react';

interface Props {
	userId: string;
	otherUserId: string;
}

function ChatComponentWithId({ userId, otherUserId }: Props) {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);

	// Create a consistent conversation ID
	const conversationId = [userId, otherUserId].sort().join('-');

	useEffect(() => {
		if (!userId || !otherUserId || !db) {
			console.error('Invalid IDs or Firestore is not initialized. Check Firebase configuration.');
			return;
		}

		const messagesCollection = query(collection(db, `conversations/${conversationId}/messages`), orderBy('createdAt'));

		const unsubscribe = onSnapshot(messagesCollection, snapshot => {
			const loadedMessages = snapshot.docs.map(doc => ({
				id: doc.id,
				text: doc.data().text,
			}));
			setMessages(loadedMessages);
		});

		return () => unsubscribe();
	}, [userId, otherUserId, conversationId]);

	const handleSendMessage = async () => {
		if (message.trim() !== '' && userId && otherUserId) {
			await sendMessage(message, userId, otherUserId, conversationId);
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
				className="rounded bg-gray-700 px-4 py-2 text-white transition duration-150 hover:bg-gray-600"
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

export default ChatComponentWithId;

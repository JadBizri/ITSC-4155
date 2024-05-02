import { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import db from '~/lib/firebase';
import { sendMessage } from '~/services/firebaseServiceWithId';
import { api } from '~/utils/api';
import axios from 'axios';

interface Props {
	userId: string;
	otherUserId: string;
}

function ChatComponentWithId({ userId, otherUserId }: Props) {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<{ id: string; text: string; receiverId: string; senderId: string }[]>([]);

	const userName = api.user.getUserNameById.useQuery(userId);
	const otherName = api.user.getUserNameById.useQuery(otherUserId);
	const newPhone = api.user.getUserPhonebyId.useQuery(otherUserId ?? '');

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
				text: doc.data().text as string,
				receiverId: doc.data().receiverId as string,
				senderId: doc.data().senderId as string,
			}));
			setMessages(loadedMessages);
		});

		return () => unsubscribe();
	}, [userId, otherUserId, conversationId]);

	const handleSendMessage = useCallback(async () => {
		if (message.trim() !== '' && userId && otherUserId) {
			await sendMessage(message, userId, otherUserId, conversationId);
			setMessage('');
			try {
				if (newPhone) {
					const response = await axios.post('/api/otp/phoneNotify', {
						phoneNumber: newPhone.data?.phone,
						notifyType: 'newMessage',
					});
					console.log('send phone notify');
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			console.error('Cannot send an empty message or missing user IDs.');
		}
	}, [message, userId, otherUserId, conversationId]);

	return (
		<div className=" mx-auto rounded-lg  p-4 shadow-lg">
			<ul className="h-64 space-y-2 overflow-y-auto p-2">
				{messages.map(msg => (
					<li
						key={msg.id}
						className={`rounded-lg p-3 text-gray-900 ${msg.senderId === userId ? 'ml-auto bg-gray-100' : 'mr-auto bg-gray-300'}`}
					>
						<div className="text-sm font-semibold">
							{msg.senderId === userId ? userName.data?.name : otherName.data?.name}
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
					aria-label="Type a message"
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

export default ChatComponentWithId;

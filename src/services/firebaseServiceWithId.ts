import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import db from '../lib/firebase';

export const sendMessage = async (
	messageText: string,
	senderId: string,
	receiverId: string,
	conversationId: string,
): Promise<void> => {
	if (!db) {
		console.error('Firestore is not initialized.dude.');
		return;
	}
	try {
		const messageData = {
			text: messageText,
			senderId: senderId,
			receiverId: receiverId,
			createdAt: serverTimestamp(),
		};

		await addDoc(collection(db, `conversations/${conversationId}/messages`), messageData);

		const conversationRef = doc(db, `conversations/${conversationId}`);
		const conversationData = {
			participants: [senderId, receiverId],
			lastMessage: messageText,
			lastMessageTimestamp: serverTimestamp(),
			updatedAt: serverTimestamp(),
		};

		await setDoc(conversationRef, conversationData, { merge: true });

		console.log('Document written with ID: ', conversationRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

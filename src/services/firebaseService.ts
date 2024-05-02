// src/services/firebaseService.ts
import { collection, addDoc } from 'firebase/firestore';
import db from '../lib/firebase';

export const sendMessage = async (messageText: string, userId: string): Promise<void> => {
	if (!db) {
		console.error('Firestore is not initialized. Make sure Firebase is properly configured.');
		return;
	}
	try {
		const docRef = await addDoc(collection(db, 'messages'), {
			text: messageText,
			userId: userId,
			createdAt: new Date(),
		});
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

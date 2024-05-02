// Import the functions you need from the SDKs you need
//src\lib\firebase .ts

import type { Firestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD3VpFLJwBEaaFGxE4i43jyo-6Itv3513k',
	authDomain: 'flipmart-1e527.firebaseapp.com',
	projectId: 'flipmart-1e527',
	storageBucket: 'flipmart-1e527.appspot.com',
	messagingSenderId: '355813158781',
	appId: '1:355813158781:web:3c79953124f3da18f22614',
	measurementId: 'G-BHCJTJ1MKL',
};

let db: Firestore | undefined;

if (typeof window !== 'undefined') {
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	db = getFirestore(app);
}

export default db;

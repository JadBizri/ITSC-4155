import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { query, collection, where, onSnapshot, type Timestamp } from 'firebase/firestore';
import db from '~/lib/firebase';
import { SiteHeader } from '~/components/site-header';
import { Footer } from '~/components/footer';
import { api } from '~/utils/api';
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

interface Conversation {
	id: string;
	lastMessage?: string;
	participants: string[];
	lastMessageTimestamp?: Timestamp;
}

function ChatOverview() {
	const { data: session } = useSession();
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (session && session.user && session.user.id && db) {
			const q = query(collection(db, 'conversations'), where('participants', 'array-contains', session.user.id));
			const unsubscribe = onSnapshot(q, snapshot => {
				const loadedConversations = snapshot.docs.map(doc => ({
					...(doc.data() as Conversation),
					id: doc.id,
					participants: doc.data().participants as string[],
					lastMessage: doc.data().lastMessage as string,
					lastMessageTimestamp: doc.data().lastMessageTimestamp as Timestamp,
				}));

				setConversations(loadedConversations);
			});

			return () => unsubscribe();
		}
	}, [session]);

	const handleConversationClick = (id: string) => {
		router.push(`/chat/conversation/${id}`);
	};

	return (
		<div>
			<SiteHeader />
			<div className="container mx-auto px-4">
				{session && session.user && session.user.id && db ? (
					<>
						<h1 className="my-6 text-2xl font-semibold">Your Conversations</h1>

						<ul className="space-y-4">
							{conversations.map(convo => (
								<li key={convo.id} className="rounded-lg bg-white p-4 shadow transition duration-150 hover:bg-gray-50">
									<button
										onClick={() => handleConversationClick(convo.id)}
										className="flex w-full items-center justify-between text-blue-500 hover:text-blue-700"
									>
										<span>
											User Id:{' '}
											{convo.participants.map(participant => (participant !== session.user.id ? participant : ''))}
										</span>
										<ChevronRightIcon className="h-10 w-5" />
									</button>

									<p className="mt-2 text-gray-600">Last message Sent: {convo.lastMessage}</p>
								</li>
							))}
						</ul>
					</>
				) : (
					<div className="mb-4 rounded-lg p-4 shadow">
						<h1 className="text-xl font-semibold">Welcome</h1>
						<p>Please sign in to view your conversations</p>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default ChatOverview;

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { query, collection, where, onSnapshot, type Timestamp } from 'firebase/firestore';
import db from '~/lib/firebase';
import { SiteHeader } from '~/components/site-header';
import { Footer } from '~/components/footer';

interface Conversation {
	id: string;
	lastMessage?: string;
	participants: string[];
	lastMessageTimestamp?: Timestamp;
}

function ChatOverview() {
	const { data: session } = useSession();
	const [conversations, setConversations] = useState<Conversation[]>([]);

	useEffect(() => {
		if (session && session.user && session.user.id && db) {
			const q = query(collection(db, 'conversations'), where('participants', 'array-contains', session.user.id));
			const unsubscribe = onSnapshot(q, snapshot => {
				const loadedConversations = snapshot.docs.map(doc => ({
					...(doc.data() as Conversation),
					id: doc.id,
				}));
				setConversations(loadedConversations);
			});

			return () => unsubscribe();
		}
	}, [session]);

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
									<a href={`/chat/conversation/${convo.id}`} className="text-blue-500 hover:text-blue-700">
										Chat with {convo.participants.filter(p => p !== session?.user?.id).join(', ')}
									</a>
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

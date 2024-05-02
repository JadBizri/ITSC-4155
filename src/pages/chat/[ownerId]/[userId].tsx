import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ChatComponentWithId from '~/components/chatComponentWithId';
import { SiteHeader } from '~/components/site-header';
import { Footer } from '~/components/footer';

export default function ChatPage() {
	const router = useRouter();
	const ownerId = Array.isArray(router.query.ownerId) ? router.query.ownerId[0] : router.query.ownerId;
	const userId = router.query.userId as string; // Assuming userId is always a string
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-lg font-semibold">Loading...</div>
			</div>
		);
	}

	if (!session || session.user.id !== userId) {
		return (
			<div className="flex min-h-screen items-center justify-center text-lg font-bold text-red-500">
				Access Denied. You shouldn't be here bud
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col bg-gray-100">
			<SiteHeader />
			<div className="flex-grow p-4">
				<h1 className="mb-4 text-2xl font-bold text-gray-700">Chat with the Seller</h1>
				<div className="mb-6 rounded-lg bg-white p-4 shadow">
					<h1 className="text-xl font-semibold text-gray-800">Chat with {ownerId}</h1>
					<p className="text-gray-600">Chatting as {userId}</p>
				</div>
				{userId && ownerId && <ChatComponentWithId userId={userId} otherUserId={ownerId} />}
			</div>
			<Footer />
		</div>
	);
}

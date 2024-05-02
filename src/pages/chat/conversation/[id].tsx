import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import ChatComponentWithConvoId from '~/components/chatComponentWithConvoId';
import { useSession } from 'next-auth/react';
import { SiteHeader } from '~/components/site-header';

const ConversationPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession();

	const goToChatOverview = () => {
		router.push('/chatOverview');
	};

	return (
		<div>
			<SiteHeader />
			{session && (
				<div className="mb-4 flex items-center">
					<button
						onClick={goToChatOverview}
						className="mr-2 flex items-center rounded bg-gray-500 px-4 py-2 text-white"
					>
						<ArrowLeftIcon className="mr-1 h-5 w-5" /> Back To Messages
					</button>
				</div>
			)}
			<h1 className="mb-4 text-3xl font-bold text-gray-800">Conversation Page</h1>
			{session ? (
				id && typeof id === 'string' ? (
					<div>
						<ChatComponentWithConvoId conversationId={id} />
					</div>
				) : (
					<p>Loading conversation...</p>
				)
			) : (
				<p>Please log in to view conversations.</p>
			)}
		</div>
	);
};

export default ConversationPage;

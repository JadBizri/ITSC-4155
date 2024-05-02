import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import ChatComponentWithConvoId from '~/components/chatComponentWithConvoId';
import { useSession } from 'next-auth/react';
import { SiteHeader } from '~/components/site-header';
import { api } from '~/utils/api';

const ConversationPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession();

	const userID = (id as string)?.split('-')[0] || '';
	const otherUserID = (id as string)?.split('-')[1];

	const sessionUserName = api.user.getUserNameById.useQuery(userID);
	const otherName = api.user.getUserNameById.useQuery(otherUserID as string);

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
						<div className="mb-6 rounded-lg bg-white p-4 shadow">
							<h1 className="text-xl font-semibold text-gray-800">Chat with: {otherName.data?.name}</h1>
							<p className="text-gray-600">Chatting as: {sessionUserName.data?.name}</p>
						</div>
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

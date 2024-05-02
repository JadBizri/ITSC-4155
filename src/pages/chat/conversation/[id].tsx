import { useRouter } from 'next/router';
import ChatComponentWithConvoId from '~/components/chatComponentWithConvoId';

import { SiteHeader } from '~/components/site-header';
const ConversationPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
			<SiteHeader />
			<h1 className="mb-4 text-3xl font-bold text-gray-800">Conversation Page</h1>
			{id && typeof id === 'string' ? (
				<div className="w-full max-w-4xl rounded-lg bg-white p-4 shadow">
					<ChatComponentWithConvoId conversationId={id} />
				</div>
			) : (
				<p className="text-lg text-gray-500">Loading conversation...</p>
			)}
		</div>
	);
};

export default ConversationPage;

import { useRouter } from 'next/router';
import { FiMail } from 'react-icons/fi';

const MessagesButton = ({ label }: { label: string }) => {
	const router = useRouter();

	const navigate = async () => {
		await router.push('/chatOverview');
	};

	return (
		<button
			onClick={navigate}
			className="inline-flex items-center rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600"
		>
			<FiMail className="mr-2" /> {label}
		</button>
	);
};

export default MessagesButton;

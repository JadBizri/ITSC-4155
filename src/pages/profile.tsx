import { useSession } from 'next-auth/react';
import { SiteHeader } from '~/components/site-header';
import Head from 'next/head';
import { ProfileImage } from '~/components/ui/profile-img';

export default function Profile() {
	const { data: sessionData } = useSession();

	return (
		<>
			<Head>
				<title>Profile</title>
				<meta name="description" content="Profile page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
				<SiteHeader />

				<ProfileImage imageUrl="https://picsum.photos/seed/picsum/100" size={10} />
			</div>
		</>
	);
}

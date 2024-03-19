import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

import { api } from '~/utils/api';
import { Button } from '~/components/ui/button';
import { SiteHeader } from '~/components/site-header';

export default function Home() {
	const hello = api.item.hello.useQuery({ text: 'from tRPC' });

	return (
		<>
			<Head>
				<title>Flipmart</title>
				<meta name="description" content="ITSC 4155 Capstone Project" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
				<SiteHeader />
			</div>
		</>
	);
}

function AuthShowcase() {
	const { data: sessionData } = useSession();

	const { data: secretMessage } = api.item.getSecretMessage.useQuery(
		undefined, // no input
		{ enabled: sessionData?.user !== undefined },
	);

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<p className="text-center text-2xl text-white">
				{sessionData && <span>Logged in as {sessionData.user?.name}</span>}
				{sessionData && <span>Email {sessionData.user?.email}</span>}
				{secretMessage && <span> - {secretMessage}</span>}
			</p>
			<Button onClick={sessionData ? () => void signOut() : () => void signIn()}>
				{sessionData ? 'Sign out' : 'Sign in'}
			</Button>
		</div>
	);
}

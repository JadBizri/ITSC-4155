// src/pages/chatPageId.tsx
import { SiteHeader } from '~/components/site-header';
import { signIn, signOut, useSession } from 'next-auth/react';
import ChatComponentWithId from '~/components/chatComponentWithId';

export default function MyChatPage() {
	return (
		<div>
			<SiteHeader />
			<h1>Chat Page</h1>
		</div>
	);
}

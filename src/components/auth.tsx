'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { UserNav } from './user-nav';

export function Auth() {
	const { data: sessionData } = useSession();

	return (
		<>
			{sessionData ? (
				<UserNav {...sessionData} />
			) : (
				<Button onClick={sessionData ? () => void signOut() : () => void signIn()}>
					{sessionData ? 'Sign out' : 'Sign in'}
				</Button>
			)}
		</>
	);
}

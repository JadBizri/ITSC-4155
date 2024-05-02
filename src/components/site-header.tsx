import Link from 'next/link';
import { Auth } from './auth';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';
import { CreateButton } from './create-button';
import { useSession } from 'next-auth/react';
import MessagesButton from './myMessages';
export function SiteHeader() {
	const { data: sessionData } = useSession();

	return (
		<header className="top-0 z-10 flex flex-row justify-between p-6">
			<Link href="/">FlipMart</Link>
			<MainNav />
			<div className="flex items-center gap-2">
				{sessionData && <CreateButton />}
				<ThemeToggle />
				{sessionData && <MessagesButton label="My Messages" />}

				<Auth />
			</div>
		</header>
	);
}

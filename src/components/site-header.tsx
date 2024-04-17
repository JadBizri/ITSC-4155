import Link from 'next/link';
import { Auth } from './auth';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
	return (
		<header className="top-0 z-10 flex flex-row justify-between p-6">
			<Link href="/">FlipMart</Link>
			<MainNav />
			<div className="flex items-center gap-2">
				<ThemeToggle />
				<Auth />
			</div>
		</header>
	);
}

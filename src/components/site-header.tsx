import { Auth } from './auth';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
	return (
		<header className="sticky top-0 flex justify-between p-6">
			<MainNav />
			<div className="flex items-center gap-2">
				<ThemeToggle />
				<Auth />
			</div>
		</header>
	);
}

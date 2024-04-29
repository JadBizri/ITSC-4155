import type { Session } from 'next-auth';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export function UserNav(sessionData: Session) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar>
						<AvatarImage src={sessionData.user?.image ?? undefined} alt={sessionData.user?.name ?? undefined} />
						<AvatarFallback>{sessionData.user?.name ? getInitials(sessionData.user.name) : 'FM'}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link className="inline-flex items-center" href="/profile">
						<User className="mr-4 h-4 w-4" />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link className="inline-flex items-center" href="#">
						<Settings className="mr-4 h-4 w-4" />
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => void signOut()} className="cursor-pointer">
					<LogOut className="mr-4 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function getInitials(name: string) {
	return name
		.split(' ')
		.map(word => word.charAt(0))
		.join('');
}

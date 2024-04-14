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
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<User className="mr-4 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings className="mr-4 h-4 w-4" />
					<span>Settings</span>
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

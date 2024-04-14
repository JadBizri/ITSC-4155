import { useSession } from 'next-auth/react';
import { SiteHeader } from '~/components/site-header';
import Head from 'next/head';
import { ProfileImage } from '~/components/ui/profile-img';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdOutlineDarkMode } from 'react-icons/md';
import { CiShare2 } from 'react-icons/ci';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { api } from '~/utils/api';

export default function Profile() {
	const { data: sessionData } = useSession();
	const items = api.item.getUserItems.useQuery();
	if (!sessionData) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
				<p>You need to be signed in to view this page</p>
			</div>
		);
	} else {
		return (
			<>
				<Head>
					<title>Profile</title>
					<meta name="description" content="Profile page" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
					<SiteHeader />
					<div className="mt-8 flex items-center space-y-10 text-center">
						<div className="ms-8 flex flex-col">
							<DropdownMenu open>
								<DropdownMenuTrigger>
									<ProfileImage imageUrl={sessionData?.user.image ?? ''} size="200px" />
								</DropdownMenuTrigger>
								<DropdownMenuContent className="mt-4">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<IoMdSettings className="me-1" />
										Settings
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<CiShare2 className="me-1" />
										Share With Friends
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<IoLogOutOutline className="me-1" />
										Log Out
									</DropdownMenuItem>
									<DropdownMenuItem>
										<MdOutlineDarkMode className="me-1" />
										Dark Mode
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="ms-10 flex">
							{items.data?.length === 0 ? (
								<h1 className="text-4xl">You currently do not have any active listings</h1>
							) : (
								<div>
									{' '}
									{items.data?.map(item => (
										<Card key={item.id}>
											<CardHeader>
												<CardTitle>{item.title}</CardTitle>
											</CardHeader>
											<CardContent>
												<CardDescription>{item.description}</CardDescription>
											</CardContent>
											<CardFooter>
												<Button variant="secondary">Edit</Button>
												<Button variant="destructive">Delete</Button>
											</CardFooter>
										</Card>
									))}{' '}
								</div>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

import { useSession } from 'next-auth/react';
import { SiteHeader } from '~/components/site-header';
import Head from 'next/head';
import { ProfileImage } from '~/components/ui/profile-img';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
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
					<div className="mt-8 flex flex-col items-center space-y-10 text-center">
						<div className="ms-8 flex items-center">
							{sessionData.user.image && <ProfileImage imageUrl={sessionData.user.image} size="100px" />}
							<div className="ms-3 flex flex-col">
								<h1 className="mb-3 text-4xl">Welcome, {sessionData.user.name}</h1>
								<Button variant="destructive">Delete Account</Button>
							</div>
						</div>
						<div className="m-10 flex">
							{items.data?.length === 0 ? (
								<h1 className="text-4xl">You currently do not have any active listings</h1>
							) : (
								<div>
									<h1 className="mb-3 text-4xl">Your Listings</h1>
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
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

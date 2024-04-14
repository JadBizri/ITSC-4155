import { useSession } from 'next-auth/react';
import { SiteHeader } from '~/components/site-header';
import Head from 'next/head';
import { ProfileImage } from '~/components/ui/profile-img';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export default function Profile() {
	const { data: sessionData } = useSession();
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
						<ProfileImage imageUrl={sessionData?.user.image ?? ''} size="200px" />
						{/* MUST ADD ACTUAL NAME HERE */}
						<h1 className="text-4xl font-bold">Welcome {sessionData?.user.name}!</h1>
						<Tabs defaultValue="account" className="w-[400px]">
							<TabsList>
								<TabsTrigger value="account">Account</TabsTrigger>
								<TabsTrigger value="listings">Listings</TabsTrigger>
							</TabsList>
							<TabsContent value="account">
								<Card>
									<CardHeader>
										<CardTitle>Account</CardTitle>
										<CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="space-y-1">
											{/* MUST ADD ACTUAL NAME HERE */}
											<Label htmlFor="name">Name</Label>
											<Input id="name" defaultValue={sessionData.user.name ?? ''} />
										</div>
									</CardContent>
									<CardFooter>
										<Button>Save changes</Button>
									</CardFooter>
								</Card>
							</TabsContent>
							<TabsContent value="listings">Here are your listings</TabsContent>
						</Tabs>
					</div>
				</div>
			</>
		);
	}
}

import { useSession } from 'next-auth/react';
import { SiteHeader } from '~/components/site-header';
import Head from 'next/head';
import router from 'next/router';
import { ProfileImage } from '~/components/ui/profile-img';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { api } from '~/utils/api';
import { Item } from '~/components/item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import Link from 'next/link';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import React from 'react';

export default function Profile() {
	const { data: sessionData } = useSession();
	const items = api.item.getUserItems.useQuery();
	const userOffers = api.offer.getUserOffers.useQuery();
	const mutation = api.user.deleteUser.useMutation();

	async function handleClick() {
		await mutation.mutateAsync();
		await router.push('/');
		await router.reload();
	}

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
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant="destructive">Delete Account</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently delete your account and remove your data
												from our servers.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction>
												<Button onClick={handleClick}>Confirm</Button>
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
						<div className="m-10 flex w-[80%]">
							<Tabs defaultValue="listings" className="m-auto w-[80%]">
								<TabsList className="grid w-full grid-cols-2">
									<TabsTrigger className="px-10" value="listings">
										My Listings
									</TabsTrigger>
									<TabsTrigger className="px-10" value="offers">
										My Offers
									</TabsTrigger>
								</TabsList>
								<TabsContent value="listings">
									<Card>
										<CardHeader>
											<CardTitle>My Listings</CardTitle>
										</CardHeader>
										<CardContent className="space-y-2">
											{items.data?.length === 0 ? (
												<h1 className="text-4xl">You currently do not have any active listings</h1>
											) : (
												<div className="flex flex-wrap justify-around">
													{items.data?.map(item => (
														<div className="m-2">
															<Item key={item.id} {...item} />
															<div className="mt-2 flex justify-around">
																<Link /* MUST ADD LINK TO EDIT ITEM PAGE HERE */ href={'#'}>
																	<Button variant="secondary">Edit</Button>
																</Link>
																<Link href={'/offer/' + item.slug}>
																	<Button variant="secondary">View Offers</Button>
																</Link>
																<Button variant="destructive">Delete</Button>
															</div>
														</div>
													))}
												</div>
											)}
										</CardContent>
									</Card>
								</TabsContent>
								<TabsContent value="offers">
									<Card>
										<CardHeader>
											<CardTitle>My Offers</CardTitle>
										</CardHeader>
										<CardContent className="space-y-2">
											{userOffers.data?.length === 0 ? (
												<h1 className="text-4xl">You have not made any offers yet</h1>
											) : (
												<Table>
													{userOffers.data?.length === 1 ? (
														<TableCaption>You have made a total of 1 offer.</TableCaption>
													) : (
														<TableCaption>You have made a total of {userOffers.data?.length} offers.</TableCaption>
													)}
													<TableHeader>
														<TableRow>
															<TableHead className="text-l">Item</TableHead>
															<TableHead className="text-center">Amount</TableHead>
															<TableHead className="text-center">Status</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{userOffers.data?.map(offer => (
															<TableRow key={offer.itemId}>
																<TableCell className="text-left">
																	<Link href={'/product/' + offer.item.slug}>
																		<Button variant={'link'}>{offer.item.title}</Button>
																	</Link>
																</TableCell>
																<TableCell>${(Math.round(offer.price * 100) / 100).toFixed(2)}</TableCell>
																<TableCell>{offer.status}</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											)}
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</div>
			</>
		);
	}
}

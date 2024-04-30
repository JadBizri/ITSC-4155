import router, { useRouter } from 'next/router';
import { SiteHeader } from '~/components/site-header';
import { api } from '~/utils/api';
import { Button } from '~/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

const formSchema = z.object({
	id: z.number(),
	status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
});

export default function OfferPage() {
	const { query } = useRouter();
	const item = api.item.getItemSlug.useQuery(query.slug as string);
	const getOffers = api.offer.getItemOffers.useQuery(item.data?.id ?? 0);
	const { data: sessionData } = useSession();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const mutation = api.offer.updateStatus.useMutation();

	async function onSubmit(event: React.FormEvent<HTMLFormElement>, offerId: number) {
		event.preventDefault();
		if (item.data && sessionData) {
			if (sessionData?.user.id !== item.data?.createdBy.id) {
				form.setError('status', {
					type: 'manual',
					message: 'You are not the owner of this product.',
				});
			} else {
				await mutation.mutateAsync({
					offerId: offerId,
					status: form.getValues('status'),
					itemId: item.data.id,
				});
				form.reset();
				router.reload();
			}
		} else {
			form.setError('status', {
				type: 'manual',
				message: 'Something went wrong, please try again later.',
			});
		}
	}

	if (sessionData?.user?.id !== item.data?.createdBy.id) {
		return (
			<>
				<Head>
					<title>Unauthorized Access</title>
					<meta name="error" content="Error" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
					<SiteHeader />
					<h1 className="m-auto text-center text-4xl">Unauthorized Access: You are not the owner of this product.</h1>
				</div>
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>FlipMart</title>
					<meta name="flipmart" content="Offer Page" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
					<SiteHeader />
					{item.data?.offers.length === 0 ? (
						<h1 className="m-auto text-center text-4xl">This product does not have any offers yet.</h1>
					) : (
						<>
							<h1 className="mb-10 text-center">
								<Button variant="link">
									<Link href={'/product/' + item.data?.slug}>{item.data?.title}</Link>
								</Button>
							</h1>
							<Table className="m-auto w-[80%]">
								{getOffers.data?.length === 1 ? (
									<TableCaption>This product has received a total of 1 offer.</TableCaption>
								) : (
									<TableCaption>This product has received a total of {item.data?.offers.length} offers.</TableCaption>
								)}
								<TableHeader>
									<TableRow>
										<TableHead className="text-l">Buyer Name</TableHead>
										<TableHead className="text-center">Amount</TableHead>
										{item.data?.Active ? (
											<TableHead className="text-center">Actions</TableHead>
										) : (
											<TableHead className="text-center">Status</TableHead>
										)}
									</TableRow>
								</TableHeader>
								<TableBody>
									{getOffers.data?.map(offer => (
										<TableRow key={offer.itemId}>
											<TableCell className="text-left">{offer.buyer.name}</TableCell>
											<TableCell className="text-center">${(Math.round(offer.price * 100) / 100).toFixed(2)}</TableCell>
											{item.data?.Active && offer.status === 'PENDING' ? (
												<TableCell className="flex justify-center text-center">
													<Form {...form}>
														<FormItem>
															<form onSubmit={e => onSubmit(e, offer.id)} className="flex items-center justify-center">
																<FormField
																	control={form.control}
																	name="status"
																	render={({ field }) => (
																		<FormItem>
																			<FormControl>
																				<Input type="hidden" {...field} />
																			</FormControl>
																			<FormMessage />
																		</FormItem>
																	)}
																/>
																<Button
																	type="submit"
																	onClick={() => form.setValue('status', 'ACCEPTED')}
																	className="me-3"
																>
																	Accept
																</Button>
															</form>
														</FormItem>
													</Form>
													<Form {...form}>
														<FormItem>
															<form onSubmit={e => onSubmit(e, offer.id)} className="flex items-center justify-center">
																<FormField
																	control={form.control}
																	name="status"
																	render={({ field }) => (
																		<FormItem>
																			<FormControl>
																				<Input type="hidden" {...field} />
																			</FormControl>
																			<FormMessage />
																		</FormItem>
																	)}
																/>
																<Button
																	type="submit"
																	onClick={() => form.setValue('status', 'REJECTED')}
																	variant="destructive"
																>
																	Reject
																</Button>
															</form>
														</FormItem>
													</Form>
												</TableCell>
											) : (
												<TableCell className="text-center">{offer.status}</TableCell>
											)}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</>
					)}
				</div>
			</>
		);
	}
}

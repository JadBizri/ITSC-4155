import { useRouter } from 'next/router';
import { SiteHeader } from '~/components/site-header';
import { api } from '~/utils/api';
import { Button } from '~/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function OfferPage() {
	const { query } = useRouter();
	const item = api.item.getItemSlug.useQuery(query.slug as string);
	const getOffers = api.offer.getItemOffers.useQuery(item.data?.id || 0);
	const { data: sessionData } = useSession();

	if (sessionData?.user?.id !== item.data?.createdBy.id) {
		return <h1 className="m-auto text-center text-4xl">Unauthorized Access: You are not the owner of this product.</h1>;
	} else {
		return (
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
										{item.data?.Active ? (
											<TableCell className="text-center">
												<Button variant="secondary">Accept</Button>
												<Button className="ms-3" variant="destructive">
													Reject
												</Button>
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
		);
	}
}

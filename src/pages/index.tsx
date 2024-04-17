import Head from 'next/head';
import { Item } from '~/components/item';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { api } from '~/utils/api';
import useResizeObserver from 'use-resize-observer';
import { SiteHeader } from '~/components/site-header';
import { SiteSideBar } from '~/components/site-side-bar';
import { Footer } from '~/components/footer';
import { chunk } from '~/lib/utils';
import { $Enums } from '@prisma/client';
import { toNum } from '~/lib/utils';

interface Tile {
	listing: {
		conditionText: string;
		listingId: string;
		image: {
			url: string;
		};
		locationName: string;
		price: string;
		title: string;
	};
}
interface ItemProps {
	id: number;
	title: string;
	slug: string;
	category: $Enums.Category;
	price: number;
	description: string;
	images: string[];
	location: string;
	institution: string;
	condition: string;
	createdAt: Date;
	updatedAt: Date;
	visits: number;
	UniqueVisits: number;
	createdById: string;
}
interface ModularFeedResponse {
	data: {
		modularFeed: {
			looseTiles: Tile[];
		};
	};
}
export default function Home() {
	const originalItems = api.item.itemList.useQuery();
	const { ref, width } = useResizeObserver<HTMLDivElement>();
	if (originalItems.isLoading) return <div>Loading...</div>;
	if (originalItems.isError) return <div>Error: {originalItems.error.message}</div>;
	if (!originalItems.data) return <div>No data</div>;
	const raw = Math.floor(width! / 256) - 1;
	const itemsPerRow = raw === 0 ? 1 : raw;
	console.log(width);

	const [looseTileItems, setLooseTileItems] = useState<ItemProps[]>([]);
	const [looseTileItemsRefresh, setLooseTileItemsRefresh] = useState<ItemProps[]>([]);
	const fetchingRef = useRef(false);

	const fetchLooseTiles = async (endpoint: string) => {
		if (fetchingRef.current) return;
		fetchingRef.current = true;
		try {
			const response = await axios.post<ModularFeedResponse[]>(endpoint, {
				//'/api/thirdParty/offerUpListingHome'
				zipcode: '28213',
				category: null,
			});
			//console.log(response);
			const newItems = response.data.flatMap(res =>
				res.data.modularFeed.looseTiles.slice(0, 50).map(tile => ({
					id: toNum(tile.listing.listingId),
					title: tile.listing.title,
					slug: 'https://offerup.com/item/detail/' + tile.listing.listingId,
					category: 'OTHER' as $Enums.Category,
					price: parseFloat(tile.listing.price),
					description: 'Description not available',
					images: [tile.listing.image.url],
					location: tile.listing.locationName,
					institution: 'OfferUp',
					condition: 'Description not available',
					createdAt: new Date(),
					updatedAt: new Date(),
					visits: 0,
					UniqueVisits: 0,
					createdById: 'default-user',
				})),
			);
			setLooseTileItems(prev => [...prev, ...newItems]);
		} catch (error) {
			console.error('Failed to fetch loose tiles:', error);
		} finally {
			fetchingRef.current = false;
		}
	};
	useEffect(() => {
		fetchLooseTiles('/api/thirdParty/offerUpListingHome');

		const handleScroll = () => {
			const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
			if (nearBottom) {
				fetchLooseTiles('/api/thirdParty/offerUpListingHomeRefresh');
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const combinedItems = [...(originalItems.data || []), ...looseTileItems];
	const rows = chunk(combinedItems, itemsPerRow);
	return (
		<>
			<Head>
				<title>Flipmart</title>
				<meta name="description" content="ITSC 4155 Capstone Project" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="relative flex flex-col">
				<SiteHeader />
				<div className="flex gap-10">
					<SiteSideBar />
					<div ref={ref} className="flex w-full justify-center">
						<div className="flex flex-col gap-7">
							{rows.map((row, i) => (
								<div key={i} className="flex gap-7">
									{row.map(item => (
										<Item key={item.id} {...item} />
									))}
									{looseTileItems.map(item => (
										<Item key={item.id} {...item} />
									))}
								</div>
							))}
						</div>
					</div>
					{/* <div className="flex flex-wrap gap-7">
						{looseTileItems.map(item => (
							<Item key={item.id} {...item} />
						))}
					</div> */}
				</div>
				<Footer />
			</div>
		</>
	);
}

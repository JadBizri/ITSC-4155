import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Item } from '~/components/item';
import { SiteHeader } from '~/components/site-header';
import { SiteSideBar } from '~/components/site-side-bar';
import { api } from '~/utils/api';
import { $Enums } from '@prisma/client';
interface Tile {
	listing: {
		listingId: string;
		title: string;
		image: {
			url: string;
		};
		price: string;
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

// Define an interface for the modular feed data structure from the API
interface ModularFeedResponse {
	data: {
		modularFeed: {
			looseTiles: Tile[];
		};
	};
}
export default function Search() {
	const { query } = useRouter();
	const originalItems = api.item.getItemMatchList.useQuery(query.q as string);
	const [looseTileItems, setLooseTileItems] = useState<ItemProps[]>([]);

	useEffect(() => {
		const fetchLooseTiles = async () => {
			try {
				const response = await axios.post<ModularFeedResponse>('/api/thirdParty/offerUpListingAPI', {
					searchQuery: query.q,
					zipcode: '28213',
				});
				const { data } = response;
				setLooseTileItems(
					data.data.modularFeed.looseTiles.map(tile => ({
						id: parseInt(tile.listing.listingId),
						title: tile.listing.title,
						slug: 'some-slug', // Assume slug is derived or default
						category: 'OTHER',
						price: parseFloat(tile.listing.price),
						description: 'Description not available',
						images: [tile.listing.image.url],
						location: 'Default Location',
						institution: 'Default Institution',
						condition: 'New',
						createdAt: new Date(),
						updatedAt: new Date(),
						visits: 0,
						UniqueVisits: 0,
						createdById: 'default-user',
					})),
				);
			} catch (error) {
				console.error('Failed to fetch loose tiles:', error);
			}
		};

		if (query.q) {
			fetchLooseTiles();
		}
	}, [query.q]);

	// Merge results from both API calls for rendering
	const combinedItems = [...(originalItems.data || []), ...looseTileItems];

	return (
		<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
			<SiteHeader />
			<div className="flex gap-10">
				<SiteSideBar />
				<div className="flex flex-wrap gap-7">
					{combinedItems.map(item => (
						<Item key={item.id} {...item} />
					))}
				</div>
			</div>
		</div>
	);
}

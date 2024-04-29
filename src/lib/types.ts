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

export interface ModularFeedResponse {
	data: {
		modularFeed: {
			looseTiles: Tile[];
		};
	};
}

interface Tile {
	titleId: string;
	listing: {
		conditionText: string;
		flags: string[];
		image: {
			url: string;
		};
		listingId: string;
		locationName: string;
		price: string;
		title: string;
	};
	tileType: string;
	__typename: string;
}

export interface ModularFeedResponse {
	data: {
		modularFeed: {
			filters: [];
			legacyFeedOptions: [];
			looseTiles: Tile[];
		};
	};
}

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
	sellerAd: {};
	tileType: string;
	__typename: string;
}

export interface ModularFeedResponse {
	data: {
		modularFeed: {
			categoryInfo: {};
			feedAdditions: {};
			filters: [];
			legacyFeedOptions: [];
			looseTiles: Tile[];
		};
	};
}

import Head from 'next/head';
import { Item } from '~/components/item';

import { api } from '~/utils/api';
import { SiteHeader } from '~/components/site-header';
import { SiteSideBar } from '~/components/site-side-bar';

export default function Home() {
	const items = api.item.itemList.useQuery();

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
					<div className="flex flex-wrap gap-7">{items.data?.map(item => <Item key={item.id} {...item} />)}</div>
				</div>
			</div>
		</>
	);
}

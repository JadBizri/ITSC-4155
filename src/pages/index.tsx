import Head from 'next/head';
import { Item } from '~/components/item';

import { api } from '~/utils/api';
import { SiteHeader } from '~/components/site-header';

export default function Home() {
	const items = api.item.itemList.useQuery();

	return (
		<>
			<Head>
				<title>Flipmart</title>
				<meta name="description" content="ITSC 4155 Capstone Project" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
				<SiteHeader />
				{/* eslint-disable-next-line react/jsx-key */}
				<div className="flex flex-wrap gap-7">{items.data?.map(item => <Item {...item} />)}</div>
			</div>
		</>
	);
}

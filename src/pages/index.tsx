import Head from 'next/head';
import { Item } from '~/components/item';

import { api } from '~/utils/api';
import { SiteHeader } from '~/components/site-header';
import { SiteSideBar } from '~/components/site-side-bar';
import { Footer } from '~/components/footer';
import { chunk } from '~/lib/utils';
import useResizeObserver from 'use-resize-observer';

export default function Home() {
	const items = api.item.itemList.useQuery();
	const { ref, width } = useResizeObserver<HTMLDivElement>();

	if (items.isLoading) return <div>Loading...</div>;
	if (items.isError) return <div>Error: {items.error.message}</div>;
	if (!items.data) return <div>No data</div>;

	const raw = Math.floor(width! / 256) - 1;
	const itemsPerRow = raw === 0 ? 1 : raw;
	console.log(width);
	const rows = chunk(items.data, itemsPerRow);

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
								</div>
							))}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

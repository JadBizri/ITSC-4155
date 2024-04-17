import { useRouter } from 'next/router';
import { Item } from '~/components/item';
import { SiteHeader } from '~/components/site-header';
import { SiteSideBar } from '~/components/site-side-bar';
import { api } from '~/utils/api';

export default function Search() {
	const { query } = useRouter();
	console.log(query.q);
	const items = api.item.getItemMatchList.useQuery(query.q as string);

	return (
		<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
			<SiteHeader />
			<div className="flex gap-10">
				<SiteSideBar />
				<div className="flex flex-wrap gap-7">{items.data?.map(item => <Item key={item.id} {...item} />)}</div>
			</div>
		</div>
	);
}

import Image from 'next/image';
import { useRouter } from 'next/router';
import { SiteHeader } from '~/components/site-header';
import { api } from '~/utils/api';

export default function ProductPage() {
	const { query } = useRouter();
	const item = api.item.getItemSlug.useQuery(query.slug as string);
	console.log(item.data);

	return (
		<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
			<SiteHeader />
			<h1>{item.data?.title}</h1>
			<p>${item.data?.price}</p>
			<p>{item.data?.description}</p>
			{item.data?.images.map(image => (
				<Image key={image} src={image} alt={item.data?.title ?? 'item file'} width={500} height={500} />
			))}
		</div>
	);
}

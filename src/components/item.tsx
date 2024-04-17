import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import type { Item } from '@prisma/client';
import Link from 'next/link';

export function Item({ title, images, price, institution, slug }: Item) {
	if (!slug.startsWith('https')) {
		slug = '/product/' + slug;
	}
	return (
		<div className="flex max-w-64 flex-col">
			<Link className="flex w-64 flex-col" href={`${slug}`}>
				<AspectRatio ratio={1 / 1} className="bg-muted">
					<Image
						src={images[0] ?? 'https://i.imgur.com/G4f21Ai.jpeg'}
						alt={title}
						fill
						className="rounded-md object-cover"
					/>
				</AspectRatio>
				<h1 className="mt-1 font-semibold text-zinc-950 dark:text-white">${price}</h1>
				<p className="truncate text-zinc-950 dark:text-white">{title}</p>
				<div className="flex ">
					<h1 className="text-zinc-950/50 dark:text-white/50">{institution}</h1>
					<img src="/icon_external.svg" alt="" height={20} width={20} />
				</div>
			</Link>
		</div>
	);
}

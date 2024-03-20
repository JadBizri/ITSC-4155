import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import type { Item } from '@prisma/client';

export function Item({ title, image, price, institution }: Item) {
	return (
		<div className="flex max-w-64 flex-col">
			<div className="w-64">
				<AspectRatio ratio={1 / 1} className="bg-muted">
					<Image
						src={image[0] ?? 'https://i.imgur.com/G4f21Ai.jpeg'}
						alt={title}
						fill
						className="rounded-md object-cover"
					/>
				</AspectRatio>
			</div>
			<h1 className="mt-1 font-semibold text-zinc-950 dark:text-white">${price}</h1>
			<p className="truncate text-zinc-950 dark:text-white">{title}</p>
			<h1 className="text-zinc-950/50 dark:text-white/50">{institution}</h1>
		</div>
	);
}

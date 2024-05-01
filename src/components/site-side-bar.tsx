import { Bed, Book, HomeIcon, Lamp, Shirt, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { Separator } from './ui/separator';

export function SiteSideBar({ query }: { query: string | undefined } = { query: undefined }) {
	return (
		<aside className="block pl-6">
			<h4 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">Categories</h4>
			<div className="flex flex-col gap-2">
				<Link href={`/`} className="flex gap-2">
					<HomeIcon />
					<p className="leading-7">Browse All</p>
				</Link>
				<Link
					href={query ? `/product/search?q=${query}&c=textbooks` : `/product/search?c=textbooks`}
					className="flex gap-2"
				>
					<Book />
					<p className="leading-7">Textbook</p>
				</Link>
				<Link
					href={query ? `/product/search?q=${query}&c=electronics` : `/product/search?c=electronics`}
					className="flex gap-2"
				>
					<Smartphone />
					<p className="leading-7">Electronics</p>
				</Link>
				<Link
					href={query ? `/product/search?q=${query}&c=clothing` : `/product/search?c=clothing`}
					className="flex gap-2"
				>
					<Shirt />
					<p className="leading-7">Clothing</p>
				</Link>
				<Link
					href={query ? `/product/search?q=${query}&c=essentials` : `/product/search?c=essentials`}
					className="flex gap-2"
				>
					<Lamp />
					<p className="leading-7">Room Essentials</p>
				</Link>
				<Link
					href={query ? `/product/search?q=${query}&c=furniture` : `/product/search?c=furniture`}
					className="flex gap-2"
				>
					<Bed />
					<p className="leading-7">Furniture</p>
				</Link>
			</div>
			<Separator className="my-4" />
			<h4 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">Campus</h4>
			<div className="flex flex-col gap-2">
				<Link href="">
					<p className="leading-7">North Village</p>
				</Link>
				<Link href="">
					<p className="leading-7">South Village</p>
				</Link>
				<Link href="">
					<p className="leading-7">East Village</p>
				</Link>
				<Link href="">
					<p className="leading-7">Student Union</p>
				</Link>
			</div>
		</aside>
	);
}

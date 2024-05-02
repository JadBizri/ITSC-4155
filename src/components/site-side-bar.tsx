import { Bed, Book, HomeIcon, Lamp, Shirt, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { Separator } from './ui/separator';

export function SiteSideBar({ query }: { query: string | undefined } = { query: undefined }) {
	const locations = [
		{ label: 'Student Union', value: 'STUDENT_UNION' },
		{ label: 'Atkins Library', value: 'ATKINS_LIBRARY' },
		{ label: 'Woodward', value: 'WOODWARD' },
		{ label: 'UREC', value: 'UREC' },
		{ label: 'Cone Building', value: 'CONE_BUILDING' },
		{ label: 'Star Quad', value: 'STAR_QUAD' },
		{ label: 'Belk Hall', value: 'BELK_HALL' },
		{ label: 'Elm Hall', value: 'ELM_HALL' },
		{ label: 'Greek Village', value: 'GREEK_VILLAGE' },
		{ label: 'Hawthorn Hall', value: 'HAWTHORN_HALL' },
		{ label: 'Hickory & Cedar Hall', value: 'HICKORY_CEDAR_HALL' },
		{ label: 'Holshouser Hall', value: 'HOLSHOUSER_HALL' },
		{ label: 'Hunt Hall', value: 'HUNT_HALL' },
		{ label: 'Laurel Hall', value: 'LAUREL_HALL' },
		{ label: 'Levine Hall', value: 'LEVINE_HALL' },
		{ label: 'Lynch Hall', value: 'LYNCH_HALL' },
		{ label: 'Martin Hall', value: 'MARTIN_HALL' },
		{ label: 'Miltimore Hall', value: 'MILTIMORE_HALL' },
		{ label: 'Oak Hall', value: 'OAK_HALL' },
		{ label: 'Pine Hall', value: 'PINE_HALL' },
		{ label: 'Sanford Hall', value: 'SANFORD_HALL' },
		{ label: 'Scott Hall', value: 'SCOTT_HALL' },
		{ label: 'Wallis Hall', value: 'WALLIS_HALL' },
		{ label: 'Wilson Hall', value: 'WILSON_HALL' },
		{ label: 'Witherspoon Hall', value: 'WITHERSPOON_HALL' },
	] as const;

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
				{locations.map(location => (
					<Link key={location.value} href="">
						<p className="leading-7">{location.label}</p>
					</Link>
				))}
			</div>
		</aside>
	);
}

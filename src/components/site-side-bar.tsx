import { Bed, Book, HomeIcon, Lamp, Pencil, Shirt, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export function SiteSideBar() {
	return (
		<aside>
			<h4 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">Filter</h4>
			<Dialog>
				<DialogTrigger className="flex gap-2">
					<Pencil />
					<span>Select your location</span>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Select Location</DialogTitle>
						<DialogDescription>Choose your location to see items near you.</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<Separator className="my-4" />
			<h4 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">Categories</h4>
			<div className="flex flex-col gap-2">
				<Link href="" className="flex gap-2">
					<HomeIcon />
					<p>Browse All</p>
				</Link>
				<Link href="" className="flex gap-2">
					<Book />
					<p>Textbook</p>
				</Link>
				<Link href="" className="flex gap-2">
					<Smartphone />
					<p>Electronics</p>
				</Link>
				<Link href="" className="flex gap-2">
					<Shirt />
					<p>Clothing</p>
				</Link>
				<Link href="" className="flex gap-2">
					<Lamp />
					<p>Room Essentials</p>
				</Link>
				<Link href="" className="flex gap-2">
					<Bed />
					<p>Furniture</p>
				</Link>
			</div>
			<Separator className="my-4" />
			<h4 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">Campus</h4>
			<div className="flex flex-col gap-2">
				<Link href="">
					<p>North Village</p>
				</Link>
				<Link href="">
					<p>South Village</p>
				</Link>
				<Link href="">
					<p>East Village</p>
				</Link>
				<Link href="">
					<p>Student Union</p>
				</Link>
			</div>
		</aside>
	);
}

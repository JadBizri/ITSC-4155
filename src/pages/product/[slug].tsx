import Image from 'next/image';
import { useRouter } from 'next/router';
import { SiteHeader } from '~/components/site-header';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { api } from '~/utils/api';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';

export default function ProductPage() {
	const { query } = useRouter();
	const item = api.item.getItemSlug.useQuery(query.slug as string);
	console.log(item.data);

	return (
		<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
			<SiteHeader />
			<div className="flex gap-6">
				<Carousel orientation="vertical" plugins={[WheelGesturesPlugin()]} className="w-full max-w-sm">
					<CarouselContent className="-mt-4">
						{item.data?.images.map(image => (
							<CarouselItem key={image} className="basis-1/3 pt-4">
								<Image src={image} alt={item.data?.title ?? 'item file'} width={500} height={500} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<div>
					<h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">{item.data?.title}</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6">${item.data?.price}</p>
					<Accordion type="multiple" defaultValue={['description']} className="w-full">
						<AccordionItem value="description" datatype="open">
							<AccordionTrigger>Description</AccordionTrigger>
							<AccordionContent>{item.data?.description}</AccordionContent>
						</AccordionItem>
						<AccordionItem value="institution">
							<AccordionTrigger>Institution</AccordionTrigger>
							<AccordionContent>{item.data?.institution}</AccordionContent>
						</AccordionItem>
						<AccordionItem value="location">
							<AccordionTrigger>Location</AccordionTrigger>
							<AccordionContent>{item.data?.location}</AccordionContent>
						</AccordionItem>
						<AccordionItem value="condition">
							<AccordionTrigger>Condition</AccordionTrigger>
							<AccordionContent>{item.data?.condition}</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
}

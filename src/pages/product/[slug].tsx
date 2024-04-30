import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { SiteHeader } from '~/components/site-header';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { api } from '~/utils/api';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const formSchema = z.object({
	price: z.coerce.number().positive().safe(),
});

export default function ProductPage() {
	const { query } = useRouter();
	const item = api.item.getItemSlug.useQuery(query.slug as string);
	const { data: sessionData } = useSession();

	console.log(item.data);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const mutation = api.offer.create.useMutation();

	async function onSubmit(data: z.infer<typeof formSchema>) {
		if (item.data && sessionData) {
			if (sessionData?.user.id == item.data?.createdBy.id) {
				form.setError('price', {
					type: 'manual',
					message: 'You cannot make an offer on your own item',
				});
			} else {
				await mutation.mutateAsync({
					price: data.price,
					item: item.data?.id,
					buyer: sessionData?.user.id,
				});
				form.reset();
				router.push('/profile');
			}
		} else {
			form.setError('price', {
				type: 'manual',
				message: 'Something went wrong, please try again later.',
			});
		}
	}
	return (
		<>
			<Head>
				<title>Item Offers</title>
				<meta name="description" content="Offer Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
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
						{sessionData && sessionData.user.id !== item.data?.createdBy.id ? (
							<div className="mt-3 flex items-center">
								<Form {...form}>
									<FormItem>
										<form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-center">
											<FormField
												control={form.control}
												name="price"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input type="number" placeholder="0" min={0} step={0.01} {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<Button className="ms-3" type="submit">
												Make an Offer
											</Button>
										</form>
									</FormItem>
								</Form>
							</div>
						) : (
							<></>
						)}
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
		</>
	);
}

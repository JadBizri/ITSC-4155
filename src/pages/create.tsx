'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SiteHeader } from '~/components/site-header';
import { Footer } from '~/components/footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Textarea } from '~/components/ui/textarea';
import { UploadDropzone } from '~/lib/uploadthing';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import router from 'next/router';

const formSchema = z.object({
	title: z.string().min(1).max(100),
	category: z.enum(['TEXTBOOKS', 'ELECTRONICS', 'CLOTHING', 'ESSENTIALS', 'FURNITURE', 'OTHER']),
	price: z.coerce.number().positive().safe(),
	description: z.string().min(10).max(500),
	images: z.array(z.string().url()),
	location: z.enum([
		'STUDENT_UNION',
		'ATKINS_LIBRARY',
		'WOODWARD',
		'UREC',
		'CONE_BUILDING',
		'STAR_QUAD',
		'BELK_HALL',
		'ELM_HALL',
		'GREEK_VILLAGE',
		'HAWTHORN_HALL',
		'HICKORY_CEDAR_HALL',
		'HOLSHOUSER_HALL',
		'HUNT_HALL',
		'LAUREL_HALL',
		'LEVINE_HALL',
		'LYNCH_HALL',
		'MARTIN_HALL',
		'MILTIMORE_HALL',
		'OAK_HALL',
		'PINE_HALL',
		'SANFORD_HALL',
		'SCOTT_HALL',
		'WALLIS_HALL',
		'WILSON_HALL',
		'WITHERSPOON_HALL',
	]),
	condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']),
});

const categories = [
	{ label: 'Textbooks', value: 'TEXTBOOKS' },
	{ label: 'Electronics', value: 'ELECTRONICS' },
	{ label: 'Clothing', value: 'CLOTHING' },
	{ label: 'Essentials', value: 'ESSENTIALS' },
	{ label: 'Furniture', value: 'FURNITURE' },
	{ label: 'Other', value: 'OTHER' },
] as const;

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
	{ label: 'Hickory & Cedar Hall', value: 'HICKORY&CEDAR_HALL' },
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

const conditions = [
	{ label: 'New', value: 'NEW' },
	{ label: 'Like New', value: 'LIKE_NEW' },
	{ label: 'Good', value: 'GOOD' },
	{ label: 'Fair', value: 'FAIR' },
	{ label: 'Poor', value: 'POOR' },
] as const;

export default function Create() {
	const { data: sessionData } = useSession();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const mutation = api.item.create.useMutation();

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const res = await mutation.mutateAsync(data);
		form.reset();
		await router.push(`/product/${res.slug}`);
	}

	return (
		<>
			{sessionData ? (
				<div>
					<div className="relative flex flex-col">
						<SiteHeader />
						<div className="m-auto w-[90%]">
							<h1>Create Listing</h1>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
									<FormField
										control={form.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder="title" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="category"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>Category</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																role="combobox"
																className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
															>
																{field.value
																	? categories.find(category => category.value === field.value)?.label
																	: 'Select category'}
																<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-[200px] p-0">
														<Command>
															<CommandInput placeholder="Search category..." />
															<CommandEmpty>No category found.</CommandEmpty>
															<CommandGroup>
																<CommandList>
																	{categories.map(category => (
																		<CommandItem
																			value={category.label}
																			key={category.value}
																			onSelect={() => {
																				form.setValue('category', category.value);
																			}}
																		>
																			<Check
																				className={cn(
																					'mr-2 h-4 w-4',
																					category.value === field.value ? 'opacity-100' : 'opacity-0',
																				)}
																			/>
																			{category.label}
																		</CommandItem>
																	))}
																</CommandList>
															</CommandGroup>
														</Command>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Price</FormLabel>
												<FormControl>
													<Input type="number" placeholder="10.00" min={0} step={0.01} {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea placeholder="description" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="images"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Images</FormLabel>
												<FormControl>
													<UploadDropzone
														endpoint="imageUploader"
														config={{ mode: 'auto' }}
														onClientUploadComplete={files =>
															form.setValue(
																'images',
																files.map(file => file.url),
															)
														}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="location"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>Location</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																role="combobox"
																className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
															>
																{field.value
																	? locations.find(location => location.value === field.value)?.label
																	: 'Select location'}
																<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-[200px] p-0">
														<Command>
															<CommandInput placeholder="Search location..." />
															<CommandEmpty>No location found.</CommandEmpty>
															<CommandGroup>
																<CommandList>
																	{locations.map(location => (
																		<CommandItem
																			value={location.label}
																			key={location.value}
																			onSelect={() => {
																				form.setValue('location', location.value);
																			}}
																		>
																			<Check
																				className={cn(
																					'mr-2 h-4 w-4',
																					location.value === field.value ? 'opacity-100' : 'opacity-0',
																				)}
																			/>
																			{location.label}
																		</CommandItem>
																	))}
																</CommandList>
															</CommandGroup>
														</Command>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="condition"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>Condition</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																role="combobox"
																className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
															>
																{field.value
																	? conditions.find(condition => condition.value === field.value)?.label
																	: 'Select condition'}
																<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-[200px] p-0">
														<Command>
															<CommandInput placeholder="Search category..." />
															<CommandEmpty>No Condition found.</CommandEmpty>
															<CommandGroup>
																<CommandList>
																	{conditions.map(condition => (
																		<CommandItem
																			value={condition.label}
																			key={condition.value}
																			onSelect={() => {
																				form.setValue('condition', condition.value);
																			}}
																		>
																			<Check
																				className={cn(
																					'mr-2 h-4 w-4',
																					condition.value === field.value ? 'opacity-100' : 'opacity-0',
																				)}
																			/>
																			{condition.label}
																		</CommandItem>
																	))}
																</CommandList>
															</CommandGroup>
														</Command>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit">Submit</Button>
								</form>
							</Form>
						</div>
						<Footer />
					</div>
				</div>
			) : (
				<div>Sign in to create a listing</div>
			)}
		</>
	);
}

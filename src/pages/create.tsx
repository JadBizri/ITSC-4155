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

const formSchema = z.object({
	title: z.string().min(1).max(100),
	category: z.enum(['TEXTBOOKS', 'ELECTRONICS', 'CLOTHING', 'ESSENTIALS', 'FURNITURE', 'OTHER']),
	price: z.coerce.number().positive().safe(),
	description: z.string().min(10).max(500),
	images: z.array(z.string().url()),
	location: z.string().min(5).max(100),
	institution: z.string().min(3).max(100),
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

const conditions = [
	{ label: 'New', value: 'NEW' },
	{ label: 'Like New', value: 'LIKE_NEW' },
	{ label: 'Good', value: 'GOOD' },
	{ label: 'Fair', value: 'FAIR' },
	{ label: 'Poor', value: 'POOR' },
] as const;

export default function Create() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);
	}

	return (
		<div>
			<div className="relative flex flex-col">
				<SiteHeader />
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
										<Input type="file" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input placeholder="location" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="institution"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Institution</FormLabel>
									<FormControl>
										<Input placeholder="institution" {...field} />
									</FormControl>
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
				<Footer />
			</div>
		</div>
	);
}

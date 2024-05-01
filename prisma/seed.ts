import { db } from '../src/server/db';
import type { Prisma } from '@prisma/client';

const raw = await fetch('https://api.escuelajs.co/api/v1/products');
const response = (await raw.json()) as Product[];

const realCategories = ['Clothes', 'Electronics', 'Furniture', 'Miscellaneous'];
const products = response
	.filter(product => realCategories.includes(product.category.name))
	.map(product => {
		return {
			id: product.id,
			title: product.title,
			price: product.price,
			description: product.description,
			images: product.images.map(image => image.replaceAll('[', '').replaceAll(']', '').replaceAll('"', '')),
			createdAt: product.creationAt,
			updatedAt: product.updatedAt,
			category:
				product.category.name === 'Miscellaneous'
					? 'OTHER'
					: product.category.name === 'Clothes'
						? 'CLOTHING'
						: product.category.name.toUpperCase(),
			location: '28223',
			institution: 'UNC Charlotte',
			slug: `${product.title.toLowerCase().replace(/ /g, '-')}-${rand(9)}`,
			condition: 'GOOD',
			createdById: 'cltxhhv0e0002ya6lqtp1aylt',
		} as Prisma.ItemCreateManyInput;
	});

async function main() {
	console.log('Start seeding ...');
	await db.item.deleteMany();

	await db.item.createMany({
		data: products,
	});

	console.log('Seeding completed.');
}

function rand(len: number) {
	let x = '';
	for (let i = 0; i < len; i++) {
		x += Math.floor(Math.random() * 10);
	}
	return x;
}

// rand(9);

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	creationAt: string;
	updatedAt: string;
	category: ProductCategory;
}

interface ProductCategory {
	id: string;
	name: string;
	image: string;
}

import type { $Enums } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

const conditions = [
	{ label: 'New', value: 'NEW' },
	{ label: 'Like New', value: 'LIKE_NEW' },
	{ label: 'Good', value: 'GOOD' },
	{ label: 'Fair', value: 'FAIR' },
	{ label: 'Poor', value: 'POOR' },
] as const;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function chunk<T>(arr: T[], size: number) {
	return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
}
export function toNum(uuid: string): number {
	let hash = 0;
	for (let i = 0; i < uuid.length; i++) {
		const character = uuid.charCodeAt(i);
		hash = (hash << 5) - hash + character;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

export function generateSlug(title: string): string {
	return `${title.toLowerCase().replace(/ /g, '-')}-${rand(9)}`;
}

function rand(len: number) {
	let x = '';
	for (let i = 0; i < len; i++) {
		x += Math.floor(Math.random() * 10);
	}
	return x;
}
export function formatPhoneNumber(phoneNumber: string): string {
	const cleaned = ('' + phoneNumber).replace(/\D/g, '');
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		return `\+1 (${match[1]}) ${match[2]} - ${match[3]}`;
	}
	return '';
}

export function formatLocation(location: $Enums.Location): string {
	return locations.find(loc => loc.value === location)?.label ?? 'Unknown';
}

export function formatCondition(condition: $Enums.Condition): string {
	return conditions.find(cond => cond.value === condition)?.label ?? '';
}

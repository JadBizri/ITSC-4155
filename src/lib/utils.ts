import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

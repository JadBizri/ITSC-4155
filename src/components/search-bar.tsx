import { useState } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

export function SearchBar({ placeholder }: { placeholder: string }) {
	const [searchTerm, setSearchTerm] = useState('');

	function handleSearch(term: string) {
		setSearchTerm(term);
		console.log(term);

		const search = new URLSearchParams();
		search.set('q', term);
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		window.location.href = `/product/search?${search}`;
	}

	function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			handleSearch(searchTerm);
		}
	}

	return (
		<div className="relative ml-auto flex-1 md:grow-0">
			<Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
			<Input
				type="search"
				placeholder={placeholder}
				className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				onKeyDown={handleEnter}
			/>
		</div>
	);
}

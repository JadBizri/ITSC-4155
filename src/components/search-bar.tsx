import { useState } from 'react';
import { Input } from './ui/input';

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
		<Input
			type="text"
			placeholder={placeholder}
			value={searchTerm}
			onChange={e => setSearchTerm(e.target.value)}
			onKeyDown={handleEnter}
		/>
	);
}

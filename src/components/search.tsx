import { Input } from './ui/input';

export function Search({ placeholder }: { placeholder: string }) {
	function handleSearch(term: string) {
		console.log(term);
	}
	return <Input type="text" placeholder={placeholder} onChange={e => handleSearch(e.target.value)} />;
}

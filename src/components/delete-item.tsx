import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { api } from '~/utils/api';
import router from 'next/router';

export function DeleteItem({ id, redirect }: { id: number; redirect?: boolean }) {
	const itemMutation = api.item.deleteUserItem.useMutation();
	async function deleteItemOnClick(id: number) {
		await itemMutation.mutateAsync(id);
		if (redirect) {
			await router.push('/');
		} else {
			router.reload();
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">Delete</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete an item from your account. This information will be
					lost.
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button onClick={() => deleteItemOnClick(id)} variant="destructive">
							Confirm
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

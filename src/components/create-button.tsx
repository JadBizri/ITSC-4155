'use client';

import router from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { Button } from './ui/button'; // Import from your component library
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
} from '~/components/ui/alert-dialog';
import { api } from '~/utils/api';

export function CreateButton() {
	const user = api.user.getUser.useQuery();
	const [isDialogOpen, setDialogOpen] = useState(false);

	const handleCreateClick = () => {
		if (user.data?.phoneVerified) {
			router.push('/create'); // If phone is verified, navigate to create page
		} else {
			setDialogOpen(true); // If not verified, open the alert dialog
		}
	};

	const handleConfirm = () => {
		router.push('/settings'); // Redirect to settings page for phone verification
	};
	//return <Button onClick={() => router.push('/create')}>Create an Item</Button>;
	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button onClick={handleCreateClick}>Create an Item</Button>
				</AlertDialogTrigger>
				{isDialogOpen && (
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Phone Number Verification Required</AlertDialogTitle>
							<AlertDialogDescription>
								You need a verified phone number to create a post. Please verify your phone number in your settings.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
							<AlertDialogAction>
								<Button onClick={handleConfirm}>Go to Settings</Button>
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				)}
			</AlertDialog>
		</>
	);
}

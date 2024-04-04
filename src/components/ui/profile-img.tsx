import * as React from 'react';
import { cn } from '~/lib/utils';

const ProfileImage = ({ imageUrl, size }: { imageUrl: string; size: string }) => {
	return (
		<div
			className={cn(`overflow-hidden rounded-full border-2 border-white`, 'shadow-sm')}
			style={{
				width: size,
				height: size,
			}}
		>
			<img
				src={imageUrl}
				alt="Profile"
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
			/>
		</div>
	);
};

export { ProfileImage };

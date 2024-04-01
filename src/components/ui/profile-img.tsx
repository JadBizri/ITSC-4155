import * as React from 'react';
import { cn } from '~/lib/utils';

const ProfileImage = ({ imageUrl, size }: { imageUrl: string; size: number }) => {
	return (
		<div
			className={cn(`w-${size} h-${size} overflow-hidden rounded-full border-2 border-white`, 'shadow-sm')}
			// style={{
			//   width: imageSize,
			//   height: imageSize,
			//   borderRadius: '50%',
			//   overflow: 'hidden',
			//   border: '2px solid #ffffff', // Optional: Add border
			//   boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)' // Optional: Add shadow
			// }}
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

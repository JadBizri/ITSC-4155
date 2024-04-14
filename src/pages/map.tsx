import React, { useEffect, useState } from 'react';
import { cn } from '~/lib/utils';
import Head from 'next/head';
import { SiteHeader } from '~/components/site-header';
import { Map as MapComponent } from '~/components/map';

export default function Map() {
	return (
		<>
			<Head>
				<title>Hotspots</title>
				<meta name="description" content="Popular Campus Meetup Hotspots" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
				<SiteHeader />
				<div className={cn('text-center')}>
					<h1
						className={cn(
							'mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl',
						)}
					>
						Popular Campus Meetup Hotspots
					</h1>
					<MapComponent width="1000px" height="600px" />
				</div>
			</div>
		</>
	);
}

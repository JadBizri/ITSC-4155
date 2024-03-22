import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { cn } from '~/lib/utils';
import Head from 'next/head';
import { SiteHeader } from '~/components/site-header';

export default function Map() {
	const [mapLoaded, setMapLoaded] = useState(false);

	useEffect(() => {
		const loader = new Loader({
			apiKey: 'AIzaSyDvabBI2n6_ryM84nTA4Lz5XbzE5hrpeMU',
			version: 'weekly',
		});

		loader
			.load()
			.then(() => {
				setMapLoaded(true); // Set mapLoaded state to true when the API is loaded
			})
			.catch(error => {
				console.error('Error loading Google Maps:', error);
			});
	}, []);

	useEffect(() => {
		if (mapLoaded) {
			const campus = { lat: 35.30718994140625, lng: -80.73516082763672 };
			const library = { lat: 35.3057655, lng: -80.7321937 };
			const union = { lat: 35.3082775, lng: -80.7337068 };
			const { Map } = window.google.maps; // Access the google object after the API is loaded
			const mapElement = document.getElementById('map');
			if (mapElement) {
				const map = new Map(mapElement, {
					center: campus,
					zoom: 15,
				});
				new google.maps.Marker({
					position: library,
					map,
				});
				new google.maps.Marker({
					position: union,
					map,
				});
			}
		}
	}, [mapLoaded]); // Run this effect whenever mapLoaded state changes

	return (
		<>
			<Head>
				<title>Hotspots</title>
				<meta name="description" content="Popular Campus Meetup Hotspots" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="relative flex min-h-screen flex-col bg-white dark:bg-zinc-950">
				<SiteHeader />
				<div className={cn('flex flex-col content-center justify-center')}>
					<h1>Popular Campus Meetup Hotspots</h1>
					<div id="map" style={{ height: '400px', width: '800px', borderRadius: '10px' }}></div>
				</div>
			</div>
		</>
	);
}

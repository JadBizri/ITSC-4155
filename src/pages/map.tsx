import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { cn } from '~/lib/utils';
import Head from 'next/head';
import { SiteHeader } from '~/components/site-header';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

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
				setMapLoaded(true);
			})
			.catch(error => {
				console.error('Error loading Google Maps:', error);
			});
	}, []);

	// map options
	useEffect(() => {
		if (mapLoaded) {
			const campus = { lat: 35.30682997970911, lng: -80.73334528900206 };
			const library = { lat: 35.3057655, lng: -80.7321937 };
			const union = { lat: 35.3082775, lng: -80.7337068 };
			const prospector = { lat: 35.3067786, lng: -80.7309398 };
			const belkPlaza = { lat: 35.30543057438697, lng: -80.7309305611574 };
			const starQuad = { lat: 35.306334, lng: -80.7334 };
			const cone = { lat: 35.30537696819097, lng: -80.73320071167876 };
			const icon = {
				path: faMapPin.icon[4] as string,
				fillColor: '#000000',
				fillOpacity: 1,
				anchor: new google.maps.Point(
					faMapPin.icon[0] / 2, // width
					faMapPin.icon[1], // height
				),
				strokeWeight: 1,
				strokeColor: '#ffffff',
				scale: 0.075,
				labelOrigin: new google.maps.Point(150, -100),
			};
			const { Map } = window.google.maps; // Access the google object after the API is loaded
			const mapElement = document.getElementById('map');
			if (mapElement) {
				const map = new Map(mapElement, {
					center: campus,
					zoom: 17,
					mapId: '25c330b0e68c2873',
				});
				new google.maps.Marker({
					position: library,
					map,
					icon: icon,
					label: 'Library',
				});
				new google.maps.Marker({
					position: union,
					map,
					icon: icon,
					label: 'Union',
				});
				new google.maps.Marker({
					position: prospector,
					map,
					icon: icon,
					label: 'Prospector',
				});
				new google.maps.Marker({
					position: belkPlaza,
					map,
					icon: icon,
					label: 'Belk Plaza',
				});
				new google.maps.Marker({
					position: starQuad,
					map,
					icon: icon,
					label: 'Star Quad',
				});
				new google.maps.Marker({
					position: cone,
					map,
					icon: icon,
					label: 'Cone',
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
				<div className={cn('text-center')}>
					<h1
						className={cn(
							'mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl',
						)}
					>
						Popular Campus Meetup Hotspots
					</h1>
					<div
						id="map"
						style={{ maxHeight: '600px', maxWidth: '1000px', borderRadius: '10px', margin: 'auto', padding: '250px' }}
					></div>
				</div>
			</div>
		</>
	);
}

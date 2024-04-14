import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

export function Map({ width = '100px', height = '600px' }: { width: string; height: string }) {
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

	useEffect(() => {
		if (mapLoaded) {
			const campus = { lat: 35.30682997970911, lng: -80.73334528900206 };
			const locations = [
				{ position: { lat: 35.3057655, lng: -80.7321937 }, label: 'Library' },
				{ position: { lat: 35.3082775, lng: -80.7337068 }, label: 'Union' },
				{ position: { lat: 35.3067786, lng: -80.7309398 }, label: 'Prospector' },
				{ position: { lat: 35.30543057438697, lng: -80.7309305611574 }, label: 'Belk Plaza' },
				{ position: { lat: 35.306334, lng: -80.7334 }, label: 'Star Quad' },
				{ position: { lat: 35.30537696819097, lng: -80.73320071167876 }, label: 'Cone' },
			];

			const mapElement = document.getElementById('map');
			const map = new window.google.maps.Map(mapElement!, {
				center: campus,
				zoom: 17,
				mapId: '25c330b0e68c2873',
			});

			const icon = {
				path: faMapPin.icon[4] as string,
				fillColor: '#000000',
				fillOpacity: 1,
				anchor: new window.google.maps.Point(faMapPin.icon[0] / 2, faMapPin.icon[1]),
				strokeWeight: 1,
				strokeColor: '#ffffff',
				scale: 0.075,
				labelOrigin: new window.google.maps.Point(150, -100),
			};

			locations.forEach(({ position, label }) => {
				new window.google.maps.Marker({
					position,
					map,
					icon,
					label,
				});
			});
		}
	}, [mapLoaded]);

	return (
		<div
			id="map"
			style={{
				width: width,
				height: height,
				maxHeight: '600px',
				maxWidth: '1000px',
				borderRadius: '10px',
				margin: 'auto',
				padding: '250px',
			}}
		></div>
	);
}

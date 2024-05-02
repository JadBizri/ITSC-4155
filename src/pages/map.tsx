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
					<MapComponent width="80%" height="600px" />
					{/* <p className='m-auto'><iframe className='m-auto rounded w-[80%]' height="600" src="https://maps.uncc.edu/#/?nav=plds&amp;ctr=35.30709,-80.73270000000002&amp;z=17"></iframe></p> */}
				</div>
			</div>
		</>
	);
}

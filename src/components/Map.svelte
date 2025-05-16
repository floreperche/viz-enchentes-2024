<script>
	import { geoPath, geoOrthographic, scaleLinear } from 'd3';
	import southAmerica from '../data/south-america.json';
	import RsCities from '../data/rs-mun.json';
	import affectedPopulation from '../data/affected_pop.json';
	export let step;

	let countries = southAmerica.features;
	let rsCities = RsCities.features;

	let traitedRsCities = [];

	rsCities.forEach((city) => {
		let result = {};
		result.geometry = city.geometry;
		result.type = city.type;
		result.properties = {};
		result.properties.name = city.properties.name;
		const impactdata = affectedPopulation?.find(
			(d) =>
				d.id ==
				Number(city.properties.id.substring(0, city.properties.id.length - 1)),
		);
		if (impactdata) {
			result.properties.affected_pop = impactdata.affected_pop;
			result.properties.total_pop = impactdata.total_pop;
		}
		traitedRsCities.push(result);
	});

	$: width = 400;
	$: height = 400;

	const md_breakpoint = 688;
	const sm_breakpoint = 583;

	$: scale_factor = width >= sm_breakpoint ? 4.3 : 5.5;
	$: rotate_factor = width >= md_breakpoint ? [51, 30.5, 0] : [53, 30.5, 0];

	$: projection = geoOrthographic()
		.scale(width * scale_factor)
		.rotate(rotate_factor)
		.translate([width / 2, height / 2]);

	$: path = geoPath(projection);

	const colorScale = scaleLinear()
		.domain([0, 100])
		.range(['#EAB599', '#880D50']);

	$: selectedCity = null;

	const get_part_of_affected = (city) => {
		return (
			(city.properties.affected_pop / city.properties.total_pop) *
			100
		).toFixed(2);
	};
</script>

<div
	class="flex flex-col justify-center items-center gap-4 w-full lg:max-w-5xl px-4"
>
	<h2
		class={step === 5
			? 'font-mansalva text-xl sm:text-2xl lg:text-4xl text-secondary opacity-0'
			: 'font-mansalva text-xl sm:text-2xl lg:text-4xl text-secondary'}
	>
		Impacted territories in Rio Grande do Sul
	</h2>
	<div
		class="w-full max-w-5xl h-[60vh] md:h-[80vh] border border-12 md:border-24 border-white bg-[#14004F] mx-8"
		bind:clientWidth={width}
		bind:clientHeight={height}
	>
		<svg
			width={width}
			height={height}
		>
			<defs>
				<linearGradient
					id="scaleGradient"
					x1="0%"
					x2="100%"
					y1="0%"
					y2="0%"
				>
					<stop
						offset="0%"
						stop-color="#EAB599"
					/>
					<stop
						offset="100%"
						stop-color="#880D50"
					/>
				</linearGradient>
			</defs>
			<!-- South America -->
			{#each countries as country}
				<path
					d={path(country)}
					fill="#7461AD"
					opacity="1"
					stroke="#595959"
				/>
			{/each}

			<!-- RS cities -->
			<g
				on:mouseleave={() => (selectedCity = null)}
				role="tooltip"
				>{#each traitedRsCities as city}
					<path
						d={path(city)}
						fill={colorScale(get_part_of_affected(city))}
						stroke="#666"
						stroke-opacity={city === selectedCity ? '0.8' : '0.1'}
						stroke-width={city === selectedCity ? '2' : '0.5'}
						on:mouseover={() => (selectedCity = city)}
						on:focus={() => (selectedCity = city)}
						role="tooltip"
					/>
				{/each}</g
			>

			<!-- Tooltip -->
			<g
				transform="translate({width - 20}, {height - 100})"
				font-size="24px"
				fill="#FEF6EB"
				class="font-mansalva opacity-0 md:opacity-100"
				text-anchor="end"
			>
				{#if selectedCity}
					<text
						x="0"
						y="0">{selectedCity.properties.name}</text
					><text
						x="0"
						y="30"
					>
						{#if selectedCity.properties.affected_pop === 0}No population
							affected{:else}{selectedCity.properties.affected_pop} affected people
							({get_part_of_affected(selectedCity)}%){/if}
					</text>
				{:else}
					<text
						x="0"
						y="0">970 788 people were affected in all state,</text
					><text
						x="0"
						y="30">that is 8.9% of the population.</text
					>
					<text
						x="0"
						y="60"
						class="font-sourcesans"
						font-size="14px"
						>Hover the map to see the information of a city.</text
					>{/if}
			</g>

			<!-- Scale -->
			<g
				transform="translate({(width / 3) * 2}, {width < md_breakpoint
					? height - 60
					: height / 2})"
				class="text-xs md:text-base"
				fill="#FEF6EB"
				><rect
					x="0"
					y="0"
					height="16"
					width={width / 4}
					fill="url(#scaleGradient)"
				/>
				<g
					transform="translate(0, -10)"
					text-anchor="middle"
				>
					<text>0%</text>
					<text x={width / 8}>50%</text>
					<text x={width / 4}>100%</text>
				</g>
				<text
					x={width / 8}
					y="40"
					text-anchor="middle">% of the pop. impacted</text
				>
			</g>
		</svg>
	</div>

	<!-- Mobile description -->
	<div class="inline md:hidden">
		{#if selectedCity}
			<p>
				{selectedCity.properties.name}:
				{#if selectedCity.properties.affected_pop === 0}No population affected{:else}{selectedCity
						.properties.affected_pop} affected people ({get_part_of_affected(
						selectedCity,
					)}%){/if}
			</p>
		{:else}
			<p class="font-mansalva text-lg">
				970 788 people were affected in all state, that is 8.9% of the
				population.
			</p>
			<p class="text-sm">
				Goes on the desktop version of the site to check a specific city.
			</p>{/if}
	</div>
</div>

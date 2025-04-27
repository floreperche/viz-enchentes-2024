<script>
	import southAmerica from '../data/south-america.json';
	import RsCities from '../data/rs-mun.json';
	import affectedPopulation from '../data/affected_pop.json';
	import { geoPath, geoOrthographic, scaleLinear } from 'd3';
	export let step;

	let countries = southAmerica.features;
	let rsCities = RsCities.features;
	console.log(rsCities);

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

	$: projection = geoOrthographic()
		.scale(width * 4.6)
		.rotate([51, 30.5, 0])
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

<div class="flex flex-col justify-center items-center gap-8">
	<h2
		class={step === 5
			? 'font-mansalva text-4xl text-secondary opacity-0'
			: 'font-mansalva text-4xl text-secondary'}
	>
		Impacted territories in Rio Grande do Sul
	</h2>
	<div
		class="w-5xl h-[80vh] border border-24 border-white bg-[#14004F]"
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
				transform="translate({width / 2}, {height - 100})"
				font-size="24px"
				fill="#FEF6EB"
				class="font-mansalva"
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
				transform="translate({(width / 3) * 2}, {height / 2})"
				font-size="16px"
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
					text-anchor="middle">% of the population impacted</text
				>
			</g>
		</svg>
	</div>
</div>

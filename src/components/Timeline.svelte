<script>
	import { scaleLinear } from 'd3';
	import { tweened } from 'svelte/motion';
	export let step;

	const width = 992;
	const height = 150;
	const margin = 20;
	const leftMargin = 120;

	$: xScale = scaleLinear()
		.domain([0, 39])
		.range([leftMargin, width - margin]);

	const key_dates = [
		{
			value: 0,
			date: '29 Abril',
			description: 'description text',
			alignment: 'start',
			display_step: 0,
		},
		{
			value: 6,
			date: '05 Maio',
			description: 'description text',
			alignment: 'start',
			display_step: 1,
		},
		{
			value: 15,
			date: '14 Maio',
			description: 'description text',
			alignment: 'start',
			display_step: 2,
		},
		{
			value: 35,
			date: '03 Junho',
			description: 'description text',
			alignment: 'end',
			display_step: 3,
		},
		{
			value: 39,
			date: '06 Junho',
			description: 'description text',
			alignment: 'end',
			display_step: 4,
		},
	];

	const tX = tweened(undefined, {
		delay: 0,
		duration: 1000,
	});
	$: {
		if (step) {
			tX.set(xScale(key_dates[step].value));
		} else {
			tX.set(xScale(0));
		}
	}
</script>

<div class="w-full flex justify-center">
	<svg
		width={width}
		height={height}
		class="viz"
	>
		<defs>
			<linearGradient
				id="backgroundGradient"
				x1="0%"
				x2="100%"
				y1="0%"
				y2="0%"
			>
				<stop
					offset="0%"
					stop-color="#FDF8F5"
					stop-opacity="0"
				/>
				<stop
					offset="1%"
					stop-color="#FDF8F5"
					stop-opacity="1"
				/>
			</linearGradient>
		</defs>
		{#each key_dates as date, i}
			<g
				opacity={date.display_step <= step ? '1' : 0}
				style="transition: opacity 500ms;"
			>
				<circle
					r="10"
					cx={xScale(date.value)}
					cy={height / 2}
					fill="#3A383D"
				/>
				<line
					x1={xScale(date.value)}
					x2={xScale(date.value)}
					y1={height / 2}
					y2={i % 2 ? height / 2 + 60 : height / 2 - 60}
					stroke="#3A383D"
					stroke-width="3"
				/>
				<g
					transform="translate({xScale(date.value) - 16}, 
            {i % 2 ? height / 2 + 30 : height / 2 - 40})"
				>
					<text
						text-anchor="end"
						x="0"
						y="0"
						fill="#4626A3"
						font-size="20px"
						class="font-mansalva">{date.date}</text
					>
					<text
						text-anchor="end"
						x="0"
						y="20"
						font-size="16px">{date.description}</text
					>
				</g>
			</g>
		{/each}

		{#if step >= 0}
			<line
				x1={leftMargin}
				x2={width - margin}
				y1={height / 2}
				y2={height / 2}
				stroke="#3A383D"
				stroke-width="3"
			/>
			<rect
				x={$tX}
				y=""
				width={width}
				height={height}
				fill="url(#backgroundGradient)"
			/>
			<circle
				r="10"
				cx={$tX}
				cy={height / 2}
				fill="#3A383D"
			/>
		{/if}
	</svg>
</div>

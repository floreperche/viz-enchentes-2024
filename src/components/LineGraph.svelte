<script>
	import { scaleLinear } from 'd3';

	$: width = 992;
	$: height = 150;

	$: yScale = scaleLinear().domain([0, 800]).range([height, 0]);

	const yTicks = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550];

	const levels = [
		{
			value: 535,
			description: 'Pico da cheia em 2024 (5.35 m)',
		},
		{
			value: 476,
			description: 'Pico da cheia em 1941',
		},
		{
			value: 360,
			description: 'Cota de inundação',
		},
		{
			value: 315,
			description: 'Cota de alerta',
		},
	];
</script>

<div
	class="w-full h-full"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		width={width}
		height={height}
		class="viz"
	>
		<text
			text-anchor="start"
			dominant-baseline="middle"
			x="10"
			y={yScale(580)}
			fill="#3A383D"
			font-size={'14px'}>Nivel of Gaiba</text
		>
		{#each yTicks as tick}
			<line
				x1="50"
				x2="60"
				y1={yScale(tick)}
				y2={yScale(tick)}
				stroke="#3A383D"
				stroke-width="2"
			/>
			<text
				text-anchor="start"
				dominant-baseline="middle"
				x="10"
				y={yScale(tick)}
				fill="#3A383D"
				font-size={'14px'}>{(tick / 100).toFixed(1)}m</text
			>
		{/each}
		{#each levels as level, i}
			<line
				x1={(width - 1024) / 2}
				x2={(width - 1024) / 2 + 1024}
				y1={yScale(level.value)}
				y2={yScale(level.value)}
				stroke="#4626A3"
				stroke-width="3"
			/>
			<text
				text-anchor="middle"
				x={width / 2}
				y={yScale(level.value) - 10}
				fill="#4626A3"
				font-size={i == 0 ? '48px' : '24px'}
				class="font-mansalva">{level.description}</text
			>
		{/each}
	</svg>
</div>

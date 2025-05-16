<script>
	import { scaleLinear } from 'd3';
	import levels from '../data/guaiba_threshold.json';
	export let step;

	$: width = 992;
	$: height = 150;
	const margin = 20;

	$: yScale = scaleLinear().domain([0, 800]).range([height, 0]);

	const yTicks = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550];
</script>

<div
	class="w-full h-full absolute flex justify-center"
	bind:clientWidth={width}
	bind:clientHeight={height}
	style="opacity: {step === 5 ? '1' : '0'};
				transition: opacity 1000ms;"
>
	<svg
		width={width - margin}
		height={height}
		class="viz"
	>
		<!-- AxisY -->
		<text
			text-anchor="start"
			dominant-baseline="middle"
			x="10"
			y={yScale(580)}
			fill="#3A383D"
			font-size={'16px'}>Nivel of Guaíba</text
		>
		{#each yTicks as tick, i}
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

		<!-- Lines -->
		{#each levels as level, i}
			<g
				transform="translate({(width - 1024) / 2}, 
	{yScale(level.value)})"
			>
				<path
					d="M2.1875 3C19.3662 3 36.206 2.29172 53.3517 2.17597C66.6608 2.08613 91.6204 2 105.016 2C163.773 2 205.378 2 264.135 2C287.809 2 290.281 2.00006 317.175 2C331.368 2.00006 349.297 2 362.744 2.00006C376.191 2.00011 387.086 2.00006 397.07 2.00006C443.127 2.00006 489.329 2.00006 535.476 2.00006C570.099 2.00006 604.803 2.16671 639.474 2.16671C664.615 2.16671 689.768 2.13598 714.909 2.16671C739.658 2.19697 765.259 2.17733 789.926 2.4167C868.58 3.17996 947.475 2.66669 1026.19 2.66669"
					stroke="#4626A3"
					stroke-width="4"
					stroke-linecap="round"
				/>
				{#if i == 0}
					<path
						d="M1026.2 3.84863C1002.63 1.46599 979.421 1.97744 955.614 2.14975C908.884 2.48799 862.154 2.82623 815.424 3.16446C722.004 3.84064 629.754 4.50836 536.307 5.18474C481.357 5.58247 429.099 5.42713 374.156 6.3584C334.69 7.02734 291.85 8.05902 252.407 8.34451C169.104 8.94747 85.6126 10.6567 2.22402 11.2602"
						stroke="#4626A3"
						stroke-width="3"
						stroke-linecap="round"
						transform="translate(0,-4)"
					/>
				{/if}
			</g>
			<text
				text-anchor="middle"
				x={width / 2}
				y={yScale(level.value) - 10}
				fill="#4626A3"
				class={i === 0
					? 'font-mansalva text-xl sm:text-2xl lg:text-4xl'
					: 'font-mansalva text-lg sm:text-xl lg:text-2xl'}
				>{level.description}</text
			>
		{/each}
	</svg>
</div>

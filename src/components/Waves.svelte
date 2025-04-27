<script>
	import { scaleLinear } from 'd3';
	import { tweened } from 'svelte/motion';
	export let step;

	$: width = 992;
	$: height = 150;

	$: yScale = scaleLinear().domain([0, 800]).range([height, 0]);

	const yTicks = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550];

	const levels = [
		{
			step: 0,
			value: 121,
		},
		{
			step: 1,
			value: 529,
		},
		{
			step: 2,
			value: 520,
		},
		{
			step: 3,
			value: 369,
		},
		{
			step: 4,
			value: 320,
		},
		{
			step: 5,
			value: 150,
		},
		{
			step: 6,
			value: 0,
		},
	];

	const tY = tweened(undefined, {
		delay: 0,
		duration: 1000,
	});
	$: {
		if (step >= 0 && step <= 6) {
			tY.set(yScale(levels[step].value));
		} else {
			tY.set(yScale(0));
		}
	}
</script>

<div
	class="w-full h-full absolute z-10"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		width={width}
		height={height}
		class="viz"
	>
		<!-- <text
        text-anchor="start"
        dominant-baseline="middle"
        x="10"
        y={yScale(580)}
        fill="#3A383D"
        font-size={"14px"}>Nivel of Gaiba</text
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
          font-size={"14px"}>{(tick / 100).toFixed(1)}m</text
        >
      {/each} -->
		{#if step >= 0 && step <= 6}
			<rect
				x="0"
				y={$tY}
				width={width}
				height={yScale(0) - $tY}
				fill="#CC655C"
			/>
		{/if}
	</svg>
</div>

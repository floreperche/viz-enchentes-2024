<script>
	import { scaleLinear } from 'd3';
	import { tweened } from 'svelte/motion';
	export let step;

	$: width = 992;
	$: height = 150;

	$: yScale = scaleLinear().domain([0, 800]).range([height, 0]);
	let level = 0;

	const tY = tweened(undefined, {
		delay: 0,
		duration: 1000,
	});

	$: {
		if (step == undefined || step < 1) {
			tY.set(yScale(0));
		} else if (step >= 1 && step < 6) {
			tY.set(yScale(550));
		} else {
			tY.set(yScale(900));
		}
	}
</script>

<div
	class="w-full h-full absolute -z-10"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		width={width}
		height={height}
		class="viz"
	>
		<defs>
			<linearGradient
				id="Gradient1"
				x1="0"
				x2="0"
				y1="0"
				y2="1"
			>
				<stop
					offset="0%"
					stop-color="#DA7D68"
					stop-opacity="0"
				/>
				<stop
					offset="3%"
					stop-color="#DA7D68"
					stop-opacity="0.5"
				/>
				<stop
					offset="7%"
					stop-color="#DA7D68"
					stop-opacity="0.25"
				/>
				<stop
					offset="100%"
					stop-color="#DA7D68"
					stop-opacity="0.2"
				/>
			</linearGradient>
		</defs>
		<rect
			x="0"
			y={$tY}
			width={width}
			height={yScale(0) - $tY}
			fill="url(#Gradient1)"
		/>
	</svg>
</div>

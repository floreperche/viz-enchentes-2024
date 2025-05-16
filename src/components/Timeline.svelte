<script>
	import { scaleLinear } from 'd3';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import key_dates from '../data/chronology.json';
	export let step;

	$: width = 992;
	$: height = 150;
	const margin = 20;
	$: leftMargin = width >= 608 ? 150 : 20;

	$: xScale = scaleLinear()
		.domain([0, 39])
		.range([leftMargin, width - margin]);

	const tX = tweened(undefined, {
		delay: 0,
		duration: 1600,
		easing: cubicOut,
	});
	$: {
		if (step <= 4) {
			tX.set(xScale(key_dates[step].value));
		} else if (step > 4) {
			tX.set(xScale(39));
		} else {
			tX.set(xScale(0));
		}
	}
</script>

<div
	class="flex justify-center"
	style="opacity: {step < 5 ? '1' : '0'};
				transition: opacity 1000ms;"
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
		{#if step >= 0}
			<!-- Global line -->
			<g
				transform="translate({leftMargin}, 
	{height / 2 - 5})"
			>
				<path
					d="M2.1875 6C16.6317 6 30.7909 3.16687 45.2074 2.70389C56.398 2.34452 77.3845 2 88.6478 2C138.052 2 173.034 2 222.438 2C242.344 2 244.423 2.00022 267.035 2C278.97 2.00023 294.045 2 305.351 2.00023C316.657 2.00046 325.818 2.00023 334.213 2.00023C372.938 2.00023 411.786 2.00023 450.587 2.00023C479.699 2.00023 508.879 2.66686 538.031 2.66686C559.17 2.66686 580.32 2.54392 601.458 2.66686C622.268 2.78789 643.794 2.70934 664.534 3.6668C730.668 6.71984 797.005 4.66674 863.188 4.66674"
					stroke="#ABA7E4"
					stroke-width="6"
					stroke-linecap="round"
					fill="transparent"
				/>
			</g>

			<!-- Description of each date -->
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
					<g
						transform="translate({xScale(date.value) - 3}, 
				{i % 2 ? height / 2 - 10 : height / 2 - 60})"
						class="hidden sm:inline"
						><path
							d="M3.09264 3C2.67245 5.84799 2.80208 8.82683 2.80208 11.7009C2.80208 14.1941 2.87361 16.6771 3.01193 19.1669C3.2073 22.6836 3.81907 26.2295 3.81907 29.7485C3.81907 32.1992 4.10964 34.6518 4.10964 37.1095C4.10964 39.2189 4.10964 41.3282 4.10964 43.4375C4.10964 48.2439 3.5285 53.0273 3.5285 57.8368C3.5285 60.9631 3.38321 64.0863 3.38321 67.2157"
							stroke="#3A383D"
							stroke-width="4"
							stroke-linecap="round"
						/>
					</g>

					<g
						transform="translate({xScale(date.value) - 16}, 
            {i % 2 ? height / 2 + 30 : height / 2 - 40})"
						class="hidden sm:inline"
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
		{/if}

		<!-- Transition effect -->
		{#if step >= 0}
			<rect
				x={$tX}
				y="0"
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

		<!-- Mobile display -->
		{#if step >= 0 && step <= 4}
			<g
				transform="translate({$tX - 3}, 
				{height / 2 - 10})"
				class="inline sm:hidden"
				><path
					d="M3.09264 3C2.67245 5.84799 2.80208 8.82683 2.80208 11.7009C2.80208 14.1941 2.87361 16.6771 3.01193 19.1669C3.2073 22.6836 3.81907 26.2295 3.81907 29.7485C3.81907 32.1992 4.10964 34.6518 4.10964 37.1095C4.10964 39.2189 4.10964 41.3282 4.10964 43.4375C4.10964 48.2439 3.5285 53.0273 3.5285 57.8368C3.5285 60.9631 3.38321 64.0863 3.38321 67.2157"
					stroke="#3A383D"
					stroke-width="4"
					stroke-linecap="round"
				/>
			</g>
			{#each key_dates as date, i}
				<g
					transform="translate({step <= 2
						? xScale(date.value) + 10
						: xScale(date.value) - 10}, 
            {height / 2 + 32})"
					class="inline sm:hidden"
					opacity={date.display_step == step ? '1' : 0}
					style="transition: opacity 1000ms;"
				>
					<text
						x="0"
						y="0"
						fill="#4626A3"
						font-size="20px"
						class="font-mansalva"
						text-anchor={date.alignment}>{date.date}</text
					>
					<text
						x="0"
						y="20"
						font-size="16px"
						text-anchor={date.alignment}>{date.description}</text
					>
				</g>
			{/each}
		{/if}
	</svg>
</div>

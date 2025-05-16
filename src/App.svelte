<script>
	import Background from './components/Background.svelte';
	import Cover from './components/Cover.svelte';
	import FinalThoughts from './components/FinalThoughts.svelte';
	import Introduction from './components/Introduction.svelte';
	import LineGraph from './components/LineGraph.svelte';
	import Map from './components/Map.svelte';
	import ScrollIndicator from './components/ScrollIndicator.svelte';
	import SourceAndCredits from './components/SourceAndCredits.svelte';
	import Timeline from './components/Timeline.svelte';
	import Waves from './components/Waves.svelte';
	import Scrolly from './helpers/Scrolly.svelte';

	let value;

	const steps = [...Array(9)];
</script>

<main
	class="relative font-sourcesans text-dark"
	id="disable-scrollbars"
>
	<div class="w-full h-screen flex justify-center items-center bg-[#FDF8F5]">
		<Cover />
	</div>
	<div
		style="transition: all 500ms"
		class="w-full -z-10 h-screen sticky top-0 bg-[#FDF8F5] flex justify-center items-center relative"
	>
		<ScrollIndicator step={value} />
		<Background step={value} />
		<Waves step={value} />
		<LineGraph step={value} />

		<div
			class="flex flex-col w-full lg:max-w-5xl px-4 m-8 text-2xl justify-between h-[95vh]"
		>
			<Timeline step={value} />
			<Introduction step={value} />
			<div class="w-full h-24"></div>
		</div>
	</div>

	<div class="flex w-full">
		<Scrolly bind:value={value}>
			{#each steps as _, i}
				<div
					class="h-screen w-full flex justify-center"
					class:active={value === i}
				>
					{#if i === 6}
						<Map step={value} />
					{:else if i === 7}
						<FinalThoughts />
					{:else if i === 8}
						<SourceAndCredits />
					{/if}
				</div>
			{/each}
		</Scrolly>
	</div>
</main>

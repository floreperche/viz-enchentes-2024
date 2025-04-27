<script>
	import Background from './components/Background.svelte';
	import Introduction from './components/Introduction.svelte';
	import LineGraph from './components/LineGraph.svelte';
	import Map from './components/Map.svelte';
	import Timeline from './components/Timeline.svelte';
	import Waves from './components/Waves.svelte';
	import Scrolly from './helpers/Scrolly.svelte';

	let value;

	const steps = [
		'29 Abril',
		'05 Maio',
		'14 Maio',
		'3 Junho',
		'6 Junho',
		'Cotes',
		'Map',
		'Final thoughts',
		'Sources and credits',
	];
</script>

<main
	class="relative font-sourcesans"
	id="disable-scrollbars"
>
	<div class="w-full h-screen flex justify-center items-center bg-[#FDF8F5]">
		<div class="flex flex-col gap-10 w-5xl px-4">
			<p class="font-mansalva text-4xl text-secondary">
				Rio Grande do Sul, Brasil - Maio 2024
			</p>
			<div>
				<h1 class="font-bold text-8xl text-primary">Inundações históricas</h1>
				<p class="text-2xl">
					Lorem ipsum dolor sit amet consectetur. Id id urna massa viverra mi
					vitae. Orci mattis eu et elementum malesuada pellentesque a convallis.
				</p>
			</div>
		</div>
	</div>
	<div
		class="w-full -z-10 h-screen sticky top-0 bg-[#FDF8F5] flex justify-center items-center"
	>
		<Background step={value} />
		<Waves step={value} />
		{#if value === undefined || value < 5}
			<div class="flex flex-col w-5xl p-4 text-2xl justify-between h-[95vh]">
				<Timeline step={value} />
				<Introduction step={value} />
				<div class="w-full h-24"></div>
			</div>
		{:else if value === 5}
			<div
				class="flex flex-col w-full text-2xl justify-center h-full items-center"
			>
				<LineGraph />
			</div>
			<!-- {:else if value === 6} -->
			<!-- <div
				class="flex flex-col w-5xl p-4 text-2xl justify-center h-[80vh] items-center"
			>

				<div class="w-full h-24"></div>
			</div> -->
		{:else if value === 7}
			<div
				class="flex flex-col w-5xl p-4 text-2xl justify-center h-[80vh] items-center"
			>
				<p>FINAL THOUGHTS</p>

				<div class="w-full h-24"></div>
			</div>
		{:else if value === 8}
			<div
				class="flex flex-col w-5xl p-4 text-2xl justify-center h-[80vh] items-center"
			>
				<p>SOURCES AND CREDITS</p>

				<div class="w-full h-24"></div>
			</div>
		{/if}
	</div>

	<div class="flex w-full">
		<Scrolly bind:value={value}>
			{#each steps as text, i}
				<div
					class="h-screen w-full flex justify-center"
					class:active={value === i}
				>
					{#if i === 6}<Map step={value} />
					{/if}
				</div>
			{/each}
		</Scrolly>
	</div>
</main>

<style>
</style>

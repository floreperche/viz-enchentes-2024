<script>
	import Scene from './Scene.svelte';

	export let step;
</script>

<div
	id="waves"
	class="w-full h-full absolute z-10"
>
	<Scene step={step} />
</div>

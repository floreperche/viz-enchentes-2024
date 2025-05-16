<script>
	export let step;
</script>

<div class="flex flex-col text-lg sm:text-xl lg:text-2xl gap-8">
	{#if step <= 1 || step === undefined}
		<p>
			At the end of April 2024, <span class="font-mansalva text-secondary"
				>heavy rainfalls</span
			>
			affected more than half of the state of Rio Grande do Sul, in the South of
			Brazil. As a consequence, river levels rose sharply, causing
			<span class="font-mansalva text-secondary">massive flooding</span> in many
			municipalities.
		</p>
		<p>
			In Porto Alegre, the state capital, the levels of the historic 1941 flood
			were exceeded within days. In 2024, <span
				class="font-mansalva text-secondary"
				>the Guaíba river rose to more than two meters above the flood level.</span
			>
		</p>
	{/if}
</div>

<script>
	export let step;
</script>

<div class="flex flex-col text-2xl gap-8">
	{#if step <= 1 || step === undefined}
		<p>
			Lorem ipsum dolor sit amet consectetur. Id id urna massa viverra mi vitae.
			Orci mattis eu et elementum malesuada pellentesque a convallis. Vulputate
			eu odio tellus tortor blandit. Hendrerit elit purus phasellus eget risus.
			A dictum sodales aliquet placerat ac.
		</p>
		<p>
			Vel pellentesque id mi sit. Et a elit neque etiam molestie ornare ipsum
			consequat. Felis purus pellentesque nulla erat amet. Amet diam euismod
			pellentesque curabitur enim vulputate.
		</p>
	{/if}
</div>

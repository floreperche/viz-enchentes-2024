<script>
	/**
  
     * Based on the tutorial from Dan Greenheck, https://github.com/dgreenheck/threejs-water-shader
     * And adapted for the need of this project 
	 * 
	 * Complementary files: /src/helpers/Ground.js, /src/helpers/Water.js and /src/helpers/shaders
     */

	import { scaleLinear } from 'd3';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import * as THREE from 'three';
	import { Water } from '../helpers/Water';
	import { Ground } from '../helpers/Ground';
	import enviromnent_background from '../assets/environment.png';
	import ground_texture from '../assets/ground.png';
	import levels from '../data/guaiba_evolution.json';

	export let step;

	let container;

	$: yScale = scaleLinear().domain([0, 800]).range([0, window.innerHeight]);

	$: level = 535;

	const tY = tweened(undefined, {
		delay: 0,
		duration: 2000,
		easing: cubicOut,
	});
	$: {
		if (step <= 5) {
			tY.set(yScale(level - levels[step].value));
		} else if (step > 5) {
			tY.set(yScale(600));
		} else {
			tY.set(yScale(535));
		}
	}

	$: bottom_class =
		step === undefined ? 'bottom: ' + -$tY + 'px' : 'bottom: ' + -$tY + 'px';

	const waterCreation = () => {
		// Animation
		const clock = new THREE.Clock();

		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			80,
			window.innerWidth / window.innerHeight,
			0.1,
			10,
		);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, yScale(level * 2));
		container.appendChild(renderer.domElement);

		// Environment map
		const cubeTextureLoader = new THREE.CubeTextureLoader();
		const environmentMap = cubeTextureLoader.load([
			enviromnent_background, // positive x
			enviromnent_background, // negative x
			enviromnent_background, // positive y
			enviromnent_background, // negative y
			enviromnent_background, // positive z
			enviromnent_background, // negative z
		]);

		const poolTexture = new THREE.TextureLoader().load(ground_texture);
		scene.environment = environmentMap;

		// Camera position
		camera.position.set(0, -0.04, 2.9);

		// Add some light to see the ground material
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
		scene.add(ambientLight);

		// Water
		const waterResolution = { size: 512 };
		const water = new Water({
			environmentMap,
			resolution: waterResolution.size,
		});
		scene.add(water);

		// Ground
		const ground = new Ground({
			texture: poolTexture,
		});
		scene.add(ground);

		function animate() {
			const elapsedTime = clock.getElapsedTime();
			water.update(elapsedTime);
			ground.update(elapsedTime);
			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		}

		// Handle resize
		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, yScale(level));
		});
		animate();
	};

	onMount(async () => {
		waterCreation();
	});
</script>

<div class="h-full flex relative overflow-hidden">
	<div
		class={`absolute left-0`}
		style={bottom_class}
		id="container"
		bind:this={container}
	/>
	<div
		class="absolute left-0 bottom-0 p-2 sm:p-4 md:p-6 font-mansalva text-lg sm:text-xl lg:text-2xl"
		style="opacity: {step >= 0 && step <= 5 ? '1' : '0'};
	transition: opacity 1000ms;"
	>
		<p>Level of Guaíba River</p>
	</div>
</div>

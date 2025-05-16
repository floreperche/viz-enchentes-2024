import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'viz-enchentes-2024',
	plugins: [svelte(), tailwindcss()],
});

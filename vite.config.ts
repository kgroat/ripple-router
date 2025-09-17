import { defineConfig } from 'vite';
import { ripple } from 'vite-plugin-ripple';

export default defineConfig({
	plugins: [ripple() as any],
	build: {
		target: 'esnext',
		minify: false,

		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: 'index',
		},
		rollupOptions: {
			external: [
				'ripple',
				/^ripple\//,
			],
		},
	},
});

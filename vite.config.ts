import { defineConfig } from 'vite';
import { ripple } from 'vite-plugin-ripple';

export default defineConfig(({ mode }) => ({
	plugins: [ripple() as any],
	build: {
		target: 'esnext',
		minify: false, //mode === 'production',
		sourcemap: mode !== 'production',
		lib: {
			entry: 'src/index.ts',
			formats: ['es' as const],
			fileName: 'index',
		},
		rollupOptions: {
			external: [
				'ripple',
				/^ripple\//,
			],
		},
	},
}));

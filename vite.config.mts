import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
	plugins: [
		react(),
		svgr(),
		tsconfigPaths(),
		externalizeDeps({
			deps: true,
			devDeps: false,
			peerDeps: true,
			optionalDeps: true,
			nodeBuiltins: true,
		}),
	],
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'Picex',
			fileName: 'index',
			formats: ['cjs', 'es', 'umd'],
		},
	},
});

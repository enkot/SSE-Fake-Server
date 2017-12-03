import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';

export default {
    entry: 'src/index.js',
    dest: 'dist/index.cjs.js',
    format: 'cjs',
    plugins: [
        serve('examples'),
        eslint(),
        babel(),
    ],
    banner: '#!/usr/bin/env node'
};
import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({build:{rollupOptions:{input:Object.fromEntries(['index','theory','direct','inverse','initial','causality','conclusion'].map(name=>[name,resolve(import.meta.dirname,name+'.html')]))}}});


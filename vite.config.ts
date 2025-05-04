import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	base: '/scriptAssist/',
	plugins: [react()],
	server: {
		headers: {
		  'Content-Type': 'application/javascript',
		},
	  },
	  build: {
		outDir: 'dist',
	  },
  });
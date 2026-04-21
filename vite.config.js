import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cambia 'rentor-landing' por el nombre exacto de tu repositorio en GitHub
const REPO_NAME = 'rentor-cl';

export default defineConfig({
  base: `/${REPO_NAME}/`,
  plugins: [react()],
});

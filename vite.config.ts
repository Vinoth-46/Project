import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import fs from 'fs';

try {
  const publicDir = path.resolve(__dirname, './public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const logoSrc = path.resolve(__dirname, './LOGO Kitchaa\'s Enterprise_page-0001.jpg');
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, path.join(publicDir, 'logo.jpg'));
  }

  const feeSrc = path.resolve(__dirname, '../Service Fee Structure.pdf');
  if (fs.existsSync(feeSrc)) {
    fs.copyFileSync(feeSrc, path.join(publicDir, 'service-fee-structure.pdf'));
  }
} catch (e) {
  console.error("Error copy files: ", e);
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
    },
  },
});

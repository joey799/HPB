import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),], 
  base: '/HPB/',
  // 🔍 VERVANG 'memory-game-elija' door de EXACTE naam van je GitHub repo
 
})
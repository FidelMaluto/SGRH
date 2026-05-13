/*
  Configuração do Vite para o projeto SGRH.
  Define plugins, variáveis de ambiente e as configurações do servidor de desenvolvimento.
*/
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // O HMR está desativado no AI Studio através da variável de ambiente DISABLE_HMR.
      // Não modifique — a monitorização de ficheiros está desativada para evitar cintilação durante as edições do agente.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

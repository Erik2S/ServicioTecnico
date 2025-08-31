// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://servicio-tecnico-riogrande.com',
  integrations: [tailwind(), sitemap()],
  head: [
    {
      tag: 'meta',
      attrs: {
        name: 'description',
        content: 'Servicio técnico profesional en Río Grande, Tierra del Fuego. Reparación de computadoras, celulares, electrónica, redes, cámaras y más.'
      }
    }
  ]
});

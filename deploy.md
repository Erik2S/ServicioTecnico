# Guía de Deploy - Servicio Técnico

## Scripts disponibles

- `npm run dev` - Ejecutar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa local del build
- `npm run start` - Iniciar servidor de producción
- `npm run deploy:build` - Limpiar y construir para deploy
- `npm run check` - Verificar código Astro
- `npm run lint` - Verificar sintaxis

## Opciones de Deploy

### 1. Deploy estático (Recomendado)
Tu sitio se construye como archivos estáticos en la carpeta `dist/`:

```bash
npm run deploy:build
```

Los archivos listos para deploy estarán en la carpeta `dist/`

### 2. Netlify
1. Conecta tu repositorio a Netlify
2. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18+

### 3. Vercel
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Astro

### 4. GitHub Pages
1. Agrega este workflow en `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 5. Servidor propio (VPS/Hosting)
1. Ejecuta `npm run deploy:build`
2. Sube el contenido de la carpeta `dist/` a tu servidor
3. Configura tu servidor web (Apache/Nginx) para servir archivos estáticos

## Verificar antes del deploy
```bash
npm run check
npm run build
npm run preview
```

Luego visita http://localhost:4321 para verificar que todo funciona correctamente.

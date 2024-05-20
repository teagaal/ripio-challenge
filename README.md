# ripio-challenge

Una app simple en React bootstrappeada con Vite. Usa Redux-RTK para realizar la implementación en Redux de forma más rápida.

## Cómo correr la app

1. Clonar el repositorio
2. Navegar al directorio y correr

```bash
npm install
```

3. Usar el siguiente comando para correr la aplicación. Automáticamente se abrirá una ventana de navegador.

```bash
npm run dev
```

## Docker

Para ahorrarse problemas con al ambiente, el archivo tiene un Dockerfile para crear una imagen y correr la app en un container con los siguiente comandos:

```bash
docker build -t ripio-challenge .
docker run --name ripio-challenge --rm -p 5173:5173 ripio-challenge
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Ejecutar en Dev
1. Clonar el repositorio
2. Ejecutar `pnpm install` en la carpeta raíz del proyecto
3. Clonar el `.env.example` y renombrarlo a `.env` y completar las variables de entorno
4. Levantar la base de datos `docker compose up -d`
5. Generar el Prisma Client `npx prisma generate` 
6. Ejecutar el proyecto `pnpm start:dev`
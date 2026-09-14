# Etapa 1: instalación de dependencias
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# Etapa 2: imagen final de producción
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules

COPY package*.json ./

COPY src ./src

RUN mkdir -p /app/uploads /app/logs \
    && chown -R node:node /app

USER node

EXPOSE 8080

CMD ["npm", "start"]
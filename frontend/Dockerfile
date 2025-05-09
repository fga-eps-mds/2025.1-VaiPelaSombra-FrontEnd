# Etapa de build
FROM node:20-alpine AS build

WORKDIR /app

# Copia arquivos de dependência
COPY package.json package-lock.json ./

# Instala dependências no ambiente Alpine
RUN npm install --no-optional

# Reinstala o binding correto para Alpine (musl)
RUN apk add --no-cache curl && \
    mkdir -p node_modules/@rollup && \
    curl -L https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.40.2.tgz -o rollup.tgz && \
    tar -xzf rollup.tgz && mv package node_modules/@rollup/rollup-linux-x64-musl

# Copia o restante do projeto e compila
COPY . .
RUN npm run build

# Etapa final: imagem leve do Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

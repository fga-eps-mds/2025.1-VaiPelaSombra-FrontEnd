# Etapa de build
FROM node:20-slim AS build

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install --no-optional

# Corrige binding do @swc/core para o ambiente Linux
RUN npm uninstall @swc/core && npm install @swc/core --platform=linux --arch=x64 --force

# Instala o binding correto do Rollup para glibc (node:slim usa glibc)
RUN apt-get update && apt-get install -y curl && \
    mkdir -p node_modules/@rollup && \
    curl -L https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.40.2.tgz -o rollup.tgz && \
    tar -xzf rollup.tgz && mv package node_modules/@rollup/rollup-linux-x64-gnu

# Copia o restante do projeto e executa o build
COPY . .
RUN npm run build

# Etapa final: imagem leve do Nginx para servir os arquivos estáticos
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

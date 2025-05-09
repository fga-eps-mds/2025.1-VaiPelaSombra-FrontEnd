# Etapa de build com Node 20
FROM node:20-alpine AS build

WORKDIR /app

# Copia e instala as dependências
COPY package.json package-lock.json ./
RUN npm install --no-optional

# Corrige bindings nativos do SWC
RUN npm rebuild @swc/core

# Instala manualmente o binding do Rollup
RUN apk add --no-cache curl && \
    mkdir -p node_modules/@rollup && \
    curl -L https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.40.2.tgz -o rollup.tgz && \
    tar -xzf rollup.tgz && mv package node_modules/@rollup/rollup-linux-x64-gnu

# Copia o restante dos arquivos
COPY . .

# Compila o projeto
RUN npm run build

# Etapa final: imagem leve do Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

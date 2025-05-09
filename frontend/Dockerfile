# Etapa de build usando Node.js baseado em Debian (glibc, não musl)
FROM node:20-slim AS build

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências com o ambiente Debian, sem erro de bindings
RUN npm install --no-optional

# Copia o restante do projeto e executa o build
COPY . .
RUN npm run build

# Etapa final: imagem leve do Nginx para servir os arquivos estáticos
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

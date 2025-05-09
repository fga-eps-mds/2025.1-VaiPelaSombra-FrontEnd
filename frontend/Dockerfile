# Etapa de build
FROM node:20-alpine AS build

WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package.json package-lock.json ./
RUN npm install --no-optional

# Copia o restante do projeto e compila
COPY . .
RUN npm run build

# Etapa final: imagem Nginx padrão para servir o frontend
FROM nginx:stable-alpine

# Copia os arquivos prontos para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

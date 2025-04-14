
# Etapa 1: Builder
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build || echo "No build step configured"

# Etapa 2: Runtime
FROM node:18-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app /app
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "src/index.js"]

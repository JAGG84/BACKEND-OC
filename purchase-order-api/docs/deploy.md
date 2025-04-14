
# 🚀 Despliegue de la Purchase Order API

## 🔧 Requisitos
- Cuenta en Railway, Render o un servidor con Docker
- Acceso al repositorio GitHub o ZIP del proyecto

---

## 🌐 Despliegue en Railway

1. Crea una cuenta en [https://railway.app](https://railway.app)
2. Importa el proyecto desde GitHub o sube el ZIP
3. Añade una base de datos MongoDB desde "Add Plugin"
4. Configura las variables en Railway desde `.env.example`:
   - `MONGO_URI`: Usa el connection string del plugin Mongo
   - `JWT_SECRET`, `REFRESH_TOKEN_SECRET`, etc.
5. Railway detectará automáticamente el `start` script
6. ¡Listo! La API estará disponible en una URL pública

---

## 🌐 Despliegue en Render

1. Crea una cuenta en [https://render.com](https://render.com)
2. Selecciona "New Web Service"
3. Importa el repo o conecta GitHub
4. Usa Node como entorno, puerto `3000`
5. Configura variables de entorno desde `.env.example`
6. Agrega MongoDB como servicio externo (ej. Atlas)

---

## 🐳 Despliegue en VPS con Docker

1. Sube el proyecto al VPS via SCP o Git
2. Asegúrate de tener Docker y Docker Compose
3. Configura `.env` o `.env.staging`
4. Ejecuta:
```bash
docker-compose -f docker-compose.yml up --build -d
```
5. Verifica con:
```bash
curl http://localhost:3000/api/health
```

---

## ✅ Recomendaciones

- Usa dominios personalizados con Railway/Render si es para producción
- Habilita backups en tu MongoDB si usas Atlas
- Protege los tokens y asegúrate de usar HTTPS

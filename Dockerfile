FROM node:16-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app/govidia
COPY . .
RUN npm ci 
RUN npm run build


# === Production stage ===
FROM node:16-alpine
WORKDIR /app/govidia
RUN apk --no-cache add ca-certificates && \
       npm install -g serve
COPY --from=builder /app/govidia/build/ ./build
EXPOSE 5000
CMD ["npx", "serve", "-s", "build", "-l", "5000", "--cors", "--debug"]  
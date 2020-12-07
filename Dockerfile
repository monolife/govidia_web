FROM node:15.3.0-alpine3.10 AS builder
WORKDIR /app/govidia
COPY package.json package-lock.json ./
RUN npm install
COPY ./src/ ./src/
COPY ./public/ ./public/
COPY ./.env .
RUN npm run build

FROM node:15.3.0-alpine3.10  
RUN apk --no-cache add ca-certificates && \
	npm install -g serve
WORKDIR /app/govidia
COPY --from=builder /app/govidia/build/ ./build
CMD ["serve","-s", "build", "--cors", "--debug"]  
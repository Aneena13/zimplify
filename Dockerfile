FROM node:lts-bookworm as build
WORKDIR /workdir
COPY . .
RUN npm ci 

FROM node:lts-bookworm-slim as web-server
WORKDIR /www
COPY --from=build /workdir /www
CMD npm run dev

# syntax=docker/dockerfile:1.4

FROM node:20 AS development

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci

COPY . /usr/src/app


CMD [ "npm", "run","start:server" ]

FROM development as dev-envs
RUN apt-get update && \
    apt-get install -y --no-install-recommends git

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "run","start:server" ]
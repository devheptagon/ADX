FROM node:14-slim
RUN mkdir -p /usr/src/app/app
WORKDIR /usr/src/app/app
COPY ["./*.json", "./*-lock.json", "./*.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
ENTRYPOINT ["yarn", "dev"]

FROM node:14-slim
RUN mkdir -p /usr/src/app/api
WORKDIR /usr/src/app/api
COPY package.json .
RUN npm install
RUN rm -rf node_modules/sharp
RUN npm install --arch=x64 --platform=linux --target=8.10.0 sharp
COPY . .
EXPOSE 5000
CMD ["npm", "run", "local"]

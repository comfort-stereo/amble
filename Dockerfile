FROM node:12

RUN curl "https://deb.nodesource.com/setup_12.x" | bash
RUN curl "https://dl.yarnpkg.com/debian/pubkey.gpg" | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

WORKDIR /app/

COPY package.json ./
COPY yarn.lock ./
COPY client/package.json ./client/
COPY server/package.json ./server/

RUN yarn install
COPY ./ ./
RUN yarn build

EXPOSE 5000
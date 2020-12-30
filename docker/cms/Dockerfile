FROM strapi/base

WORKDIR /srv/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production
ENV NODE_OPTIONS --max_old_space_size=8192

EXPOSE 1337

RUN yarn build

CMD ["yarn", "start"]
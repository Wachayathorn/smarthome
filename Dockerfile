# FROM node:14.15.4-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . ./
# RUN npm run build && npm prune --production

# FROM node:12.14.1-alpine
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=build /app/dist /app/dist
# COPY --from=build /app/node_modules /app/node_modules

# EXPOSE 3000
# ENTRYPOINT [ "node" ]
# CMD [ "dist/main.js" ]

FROM node:14.15.4-alpine as builder

ENV NODE_ENV build

USER node

WORKDIR /home/node

COPY . /home/node

RUN npm install

RUN npm run build

# ---

FROM node:14.15.4-alpine

ENV NODE_ENV production

USER node

WORKDIR /home/node

COPY --from=builder /home/node/package.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN npm install

CMD ["node", "dist/main.js"]
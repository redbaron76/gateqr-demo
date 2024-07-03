# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base

WORKDIR /usr/src/app

COPY . .

# if "temp" dir exists, remove it
RUN rm -rf temp

# create "temp" dir and assign write permissions to "bun" user
RUN mkdir temp && chown bun temp

# [optional] tests & build
ENV NODE_ENV=production

# install dependencies
RUN bun install

# build frontend 
RUN bun run build

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]
# pull official base image
FROM node:19.2.0-alpine 

# set working directory
WORKDIR /tictactoe

# add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# install app dependencies
COPY package-lock.json package.json ./
RUN npm install --legacy-peer-deps

# add app
COPY . ./
# start app
CMD ["npm", "run", "start"]

ENV PORT 3001

EXPOSE $PORT
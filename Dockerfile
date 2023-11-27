FROM node:16-alpine

RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app

# Copy package.json and yarn.lock to the workdir
COPY package.json yarn.lock turbo.json ./

# Copy package.json files from apps directory to the workdir
COPY apps/api/package.json apps/api/
COPY apps/client/package.json apps/client/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the files
COPY . .

# Generate the prisma client
RUN yarn db:generate

# Build the app
RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]    
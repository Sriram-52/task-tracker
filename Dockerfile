FROM node:16-alpine

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

# Build the app
RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]    
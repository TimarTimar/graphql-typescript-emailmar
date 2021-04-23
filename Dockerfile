FROM node

# Create Directory for the Container
WORKDIR /src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /src/app
# TypeScript
RUN npm run build
ENV NODE_ENV production
# Start
EXPOSE 5000
CMD [ "node", "./dist/index.js" ]
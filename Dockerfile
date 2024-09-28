FROM node:20.12.0-alpine
ENV NODE_ENV=production
WORKDIR /iz-app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
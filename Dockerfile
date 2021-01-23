FROM node:12

# Create app directory
WORKDIR /app

COPY frontend ./frontend
COPY backend ./backend

WORKDIR /app/frontend
RUN yarn install
RUN yarn build
RUN mv ./build ../backend/src/build

WORKDIR /app/backend
RUN rm -rf ../frontend
RUN yarn install
RUN yarn build
RUN mv ./src/build ../bin
EXPOSE 8080

CMD ["yarn", "start"]

FROM node:12

# Create app directory
WORKDIR /app

COPY frontend ./frontend
COPY backend ./backend

WORKDIR /app/frontend
RUN yarn install
RUN yarn build
RUN mkdir ../backend/bin

RUN mv ./build ../backend/bin/

WORKDIR /app/backend
RUN cp -r src/assets/ bin/
#RUN rm -rf ../frontend
RUN yarn install
RUN yarn build
EXPOSE 8080

CMD ["yarn", "start"]

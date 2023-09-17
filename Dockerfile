FROM node:20-slim

WORKDIR /app

COPY /package.json /app/ 

RUN npm install 

COPY . /app/

ENV PORT=8080

EXPOSE 8080

RUN npm run build

CMD ["npx","serve","-s","build"]

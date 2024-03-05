FROM node:20.3.1

WORKDIR /usr/app/blob

COPY ../package.json .

COPY ../pnpm-lock.yaml .

COPY ../ .

RUN npm i pnpm -g

RUN npm i pm2@5.3.1 -g

RUN pnpm i

RUN pnpm build

EXPOSE 3000

CMD ["pm2", "start", "processes.json", "--no-daemon"]

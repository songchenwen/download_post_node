FROM node:4-onbuild

MAINTAINER me@songchenwen.com

ADD . /app  
WORKDIR /app  
RUN npm install

ENV PORT=3000
ENV DEST=/dest

VOLUME ['/dest']
EXPOSE ${PORT:-3000}

CMD ["node", "index.js"]

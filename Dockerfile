FROM node:16-alpine

# The Username to Your Instagram Account
# [Required]
ENV INSTAGRAM_USERNAME="${INSTAGRAM_USERNAME}"
# The Password to Your Instagram Account
# [Required]
ENV INSTAGRAM_PASSWORD="${INSTAGRAM_PASSWORD}"
# PORT to listen on
ENV PORT = 3000

RUN apk add  --no-cache git

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD ["node", "."]
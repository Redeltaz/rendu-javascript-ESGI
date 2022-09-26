FROM nginx

COPY ./src/index.html /usr/share/nginx/html/
RUN mkdir /usr/share/nginx/html/js
COPY ./src/js/* /usr/share/nginx/html/js

EXPOSE 80
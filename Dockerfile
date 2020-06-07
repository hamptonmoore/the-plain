FROM jekyll/jekyll as jekyll
LABEL stage=jekyll
WORKDIR /home/jekyll
COPY . .
RUN jekyll b

FROM nginx:alpine
COPY --from=jekyll /home/jekyll/_site /usr/share/nginx/html
EXPOSE 80
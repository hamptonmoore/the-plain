FROM jekyll/jekyll as jekyll
LABEL stage=jekyll
WORKDIR /home/jekyll
COPY Gemfile* ./
COPY the-plain.gemspec .
RUN bundle install
COPY . .
RUN jekyll b

FROM nginx:alpine
COPY --from=jekyll /home/jekyll/_site /usr/share/nginx/html
RUN touch /usr/share/nginx/test
EXPOSE 80
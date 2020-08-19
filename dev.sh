docker build . -t "registry.hamptonmoore.com/blog"
docker run -p 80:80 "registry.hamptonmoore.com/blog"
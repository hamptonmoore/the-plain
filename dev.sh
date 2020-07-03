docker build . -t "registry.voyager1.hampton.pw/blog"
docker run -p 8080:80 "registry.voyager1.hampton.pw/blog"
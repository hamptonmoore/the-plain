docker build . -t "registry.voyager1.hampton.pw/blog"
docker run -p 80:80 "registry.voyager1.hampton.pw/blog"
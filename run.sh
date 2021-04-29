#!/bin/bash

docker network create desafio-pfa-net
docker volume create db_desafio_pfa
docker run -d -it --rm --network desafio-pfa-net -v db_desafio_pfa:/var/lib/mysql   --env-file ./test.env --name mysql gustavofranca/mysql

docker run -d -it --rm --network desafio-pfa-net --env-file ./test.env --name node gustavofranca/node

docker run -d -it --rm --network desafio-pfa-net --name nginx -p 8080:80 gustavofranca/nginx
exec "$@"
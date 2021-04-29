#!/bin/bash


docker build -t  gustavofranca/node node

docker build -t gustavofranca/nginx nginx

docker build -t  gustavofranca/mysql mysql
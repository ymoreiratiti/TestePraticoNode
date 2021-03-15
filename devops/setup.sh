#!/bin/bash

echo Configurando containers
docker-compose up -d
sleep 10

echo Executando as migrations
docker exec -it teste-pratico-node.web bash -c 'npm run migration; npm run seed'
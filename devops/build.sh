#!/bin/bash

echo Limpando arquivos
cd ..
rm -rf build

echo Build WEB
cd web
npm install --prefer-offline --no-audit --quiet
npm run build
cd ..

echo Build API
cd api
npm install --prefer-offline --no-audit --quiet
npm run build
mv build ../
cd ..

echo Build Docker
cd build
cp ../devops/Dockerfile ./
docker build . -t teste-pratico-node
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

echo Atualizando dokku
cd build
git init
git remote add dokku dokku@localhost:teste-pratico-node
git add --all
git commit -am "Initial Commit"
git push dokku master --force
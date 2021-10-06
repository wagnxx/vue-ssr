#!/bin/sh

echo "清空dist文件"

rm -rf ./dist

echo "打包 client-manifest 和 server-bundle"
npm run dev:s & npm run dev:c & npm start
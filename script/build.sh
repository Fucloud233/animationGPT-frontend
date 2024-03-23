#!/bin/bash

if [ $# -eq 2 ]
then
path=$2
elif [ $# -eq 1 ] 
then
path=~
else
echo "usage:" $1 "hostname path"
exit
fi

npm run build
zip html.zip ./dist -rv

scp html.zip $1:~
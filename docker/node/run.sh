#!/bin/bash

SCRIPT="$1"

cd $PROJECT_PATH

su -c "cd $PROJECT_PATH; yarn --production=false" -s /bin/bash www-app

chown -R www-app:www-app /opt/app

su -c "cd $PROJECT_PATH; $SCRIPT" -s /bin/bash www-app
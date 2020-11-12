#!/usr/bin/env bash
####################################################

####################################################
## Change Working Directory
####################################################
cd /opt/myidealtent/docker

####################################################
## Run Docker Commands
####################################################
docker-compose -p cgapi -f docker-compose-prod.yml build
docker-compose down
docker-compose -p cgapi -f docker-compose-prod.yml up -d
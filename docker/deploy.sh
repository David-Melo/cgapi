#!/usr/bin/env bash
####################################################

####################################################
## Change Working Directory
####################################################
cd /opt/api/docker

####################################################
## Run Docker Commands
####################################################
docker-compose -p cgapi -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml down
docker-compose -p cgapi -f docker-compose.prod.yml up -d
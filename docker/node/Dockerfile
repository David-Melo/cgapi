FROM node:lts

# Set ARGs For Image Build
ARG NODE_ENV=production
ARG PROJECT_PATH=/opt/app/

# Set ENVs For Container
ENV NODE_ENV=$NODE_ENV
ENV PROJECT_PATH=$PROJECT_PATH

# Create Group & User
RUN groupadd -r www-app &&\
    useradd -r -g www-app www-app

RUN mkdir -p /home/www-app &&\
    chmod 777 /home/www-app -R
    
RUN mkdir -p /home/www-app/.cache/yarn &&\
    chmod 777 /home/www-app/.cache/yarn -R

# Install TypeScript and its NodeJS wrapper globally
RUN npm i typescript ts-node -g

# Install Feathers CLI
RUN npm install @feathersjs/cli -g

# Install Global Knex CLI
RUN npm install knex -g

# Copy Run Script
COPY ./run.sh /usr/bin/run

# Set Run Ownership
RUN chmod 700 /usr/bin/run

# Set Final Workdir
WORKDIR /opt/app
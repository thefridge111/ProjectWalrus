#!/usr/bin/env bash

#Install nvm
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install stable
nvm use stable
nvm alias default stable

#Update npm
npm install -g npm

#Install Cordova
npm install -g cordova ionic


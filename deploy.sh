#!/bin/bash

docker build -t reports .
docker-compose up -d --build
#! /bin/bash

rm -rf db && mkdir db;
docker compose down --rmi all --volumes && docker compose up --build;
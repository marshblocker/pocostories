#! /bin/bash

rm -rf db && mkdir db;
docker compose down --volumes && docker compose up --build;
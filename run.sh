#! /bin/bash

rm -rf db pgadmin && mkdir db pgadmin;
docker compose down --rmi all --volumes && docker compose up --build;
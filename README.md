# pocostories
Share short stories with others.

## Features
- Create short stories (pocostories)
- Rate other's short stories
- View profile of other users
- User system

## Technical Description
- Front-end: ReactJS and Bootstrap
- Back-end: Custom API using Express
- Database: Postgresql
- Docker for containerization
- 4 pages (beside login page): user page, home page, story page, create story page
- Components unit tests
- Security features: password hashing and basic authentication

## Requirements to run
This website was developed in Mac. It was not tested to be built on other OS.
It requires Docker and Postgresql to build. I downloaded Docker from its [website](https://docs.docker.com/desktop/install/mac-install/), and
Postgresql using MacOS package manager [Homebrew](https://brew.sh/) using the command:
```
> brew install postgresql
```
I used the Postgres CLI tool `pg_isready` in the healthcheck field of the postgres service in the Docker Compose file, so make sure after installing postgresql (I advise using Homebrew for this), running the command `pg_isready --version` in the terminal will execute successfully, otherwise the Docker Compose file will not work. Also, if Docker
exits with an error saying `pocostories_db_c` is unhealthy, it is likely a hardware issue (my machine could be
faster than the machine it is being tested on) and so I would suggest increasing the `interval` and `retries` field
of the `healthcheck` of `db` in the `docker-compose.yml`. Here is a [link](https://docs.docker.com/engine/reference/builder/#healthcheck) on each `healthcheck` field description.

## How to run
```
> git clone https://github.com/marshblocker/pocostories.git
> cd pocostories
> chmod +x run.sh
> ./run.sh
```

Wait for `pocostories_server_c` to appear in the terminal before viewing the website at http://localhost:3000.

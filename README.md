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
It requires Docker, Node, Postgresql to build. I downloaded Docker from its [website](https://docs.docker.com/desktop/install/mac-install/), and
Node and Postgresql using MacOS package manager [Homebrew](https://brew.sh/) using the commands:
```
> brew install node
> brew install postgresql
```
I use the postgres cli tool `pg_isready` in the healthcheck field of the postgres service in the Docker Compose file, so make sure after installing postgresql (I advise to use Homebrew for this) the command `pg_isready --version` will execute successfully, otherwise the Docker Compose file will not work.

## How to run
```
> git clone https://github.com/marshblocker/pocostories.git
> cd pocostories
> chmod +x run.sh
> ./run.sh
```

View the website in http://localhost:3000.

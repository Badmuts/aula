<img src="packages/app-web/src/components/forms/login/logo.svg" width="75"/>

_**Aula** — A microservice oriented webservice exploring the [CNCF](https://www.cncf.io/) landscape_

## Goals

* **Microservices**: Implement a webservice using a microservice architecture
* **Containerized**: Every service should be able to run within its own container.
* **Cloud Native**: Try to incorporate useful tooling to make the project cloud native.
* **Serverless**: Explore serverless architecture while still be able to manage own server deployments.
* **Learn**: Explore latest techniques, tools within the Cloud Native industry and have fun doing so.

## Getting started
Recommend way is to use the provided docker environment:

```sh
# setup env
$ make configure
# start app
$ docker-compose up
```

This repo is exploring the monorepo paradigm. To facilitate this [Lerna](https://github.com/lerna/lerna) is used. Getting started should be as simple as running `npm install`:

```sh
$ npm install
# start app
$ npm start
```

> **Note:** This method requires you to setup your own environment

## Packages
* 💬 [amqp](packages/amqp/README.md)
* 🦄 [app-web](packages/app-web/README.md)
* 🔑 [auth](packages/auth/README.md)
* 🌍 [base-server](packages/base-server/README.md)
* 📓 [course](packages/course/README.md)
* 🔐 [crypto](packages/crypto/README.md)
* 🕵️‍♂️ [search](packages/search/README.md)
* 👨‍🎨 [user](packages/user/README.md)


## Screenshots
<img src="https://www.dropbox.com/s/plitnx02b7ek633/aula.png?raw=1">

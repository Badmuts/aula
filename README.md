<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/129/cloud-with-lightning_1f329.png" width="75"/>

_**Aula** — A webservice exploring the [CNCF](https://www.cncf.io/) landscape_

## Goals

* **Microservices**: Implement a webservice using a microservice architecture
* **Containerized**: Every service should be able to run within its own container.
* **Serverless**: Explore serverless architecture while still be able to manage own server deployments.
* **Learn**: Explore latest techniques, tools within the Cloud Native industry and have fun doing so.

## Getting started
This repo is exploring the monorepo paradigm. To facilitate this [Lerna](https://github.com/lerna/lerna) is used. Getting started should be as simple as running `npm install`:

```sh
$ npm install
# Run client
$ npm run start:client
# Run server
$ npm run start:user
```

Recommend way is to use the provided docker environment:

```sh
$ docker-compose up
```

## Packages
* 💬 [amqp](packages/amqp/README.md)
* 🦄 [app-web](packages/app-web/README.md)
* 🌍 [base-server](packages/base-server/README.md)
* 📓 [course](packages/course/README.md)
* 🔐 [crypto](packages/crypto/README.md)
* 🕵️‍♂️ [search](packages/search/README.md)
* 👨‍🎨 [user](packages/user/README.md)

<img src="packages/app-web/src/components/forms/login/logo.svg" width="75"/>

_**Aula** — A microservice oriented webservice exploring the [CNCF](https://www.cncf.io/) landscape_

## Goals

* **Microservices**: Implement a webservice using a microservice architecture
* **Containerized**: Every service should be able to run within its own container.
* **Cloud Native**: Try to incorporate useful tooling from the CNCF project.
* **Serverless**: Explore how serverless and a microservice architecture work together.
* **Learn**: Explore latest techniques, tools from the Cloud Native Foundation and industry and have fun doing so.

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
* 🦄 ~~[app-web](packages/app-web)~~ Replaced by [web](services/web)
* 🔑 [auth](packages/auth)
* 🌍 [base-server](packages/base-server)
* 📓 [course](packages/course)
* 🔐 [crypto](packages/crypto)
* 🕵️‍♂️ [search](packages/search)
* 👨‍🎨 [user](packages/user)
* 🔮 [websocket](packages/websocket)

## Services
* 🦄 [web](services/web) — *SSR React web app*

## Screenshots
<img src="https://www.dropbox.com/s/plitnx02b7ek633/aula.png?raw=1">

## Release
Releasing a new version can be done via the `make release` command. This command will ask you for
a version tag or fallback to `branchname-commithash`. After the build images will be pushed to the
hub.

```sh
# Build and push images
$ make release
QUEST:   Version tag?:[master-87265e6] -> 1.0.0
INFO:    Starting build for version 1.0.0
...
```

## Todo
**Services**
- [ ] Move services from packages to services
- [ ] Add Graphql endpoint
- [ ] Authenticate websocket requests
- [ ] Version message queue
- [ ] Workers (eg. search indexers)

**App**
- [ ] Implement search
- [ ] Implement course detail page

**Testing**
- [ ] Write tests and run through CI

**Operations**
- [ ] Logging
- [ ] Tracing
- [ ] Automate provisioning (db, servers, elastic etc.)

**CI**
- [ ] [Build](https://engineering.docker.com/2019/04/multi-arch-images/) multiarch images
- [ ] Only build changed services

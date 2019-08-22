<img src="services/web/static/images/logo.svg" width="75"/>

_**Aula** — A microservice oriented webservice exploring the [CNCF](https://www.cncf.io/) landscape_

[![CI](https://github.com/Badmuts/aula/workflows/Build%20and%20release/badge.svg)](https://github.com/Badmuts/aula/actions)

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
$ npx lerna start
```

> **Note:** This method requires you to setup your own environment

## Packages
* 🌍 [base-server](packages/base-server) — *Base HTTP server with Express.js*
* 🎖 [commands](packages/commands) — *Shared commands constants used by services*
* 🔐 [crypto](packages/crypto) — *Encryption utilities*
* 🎆 [events](packages/events) — *Shared events constants emitted by services*

## Services
* 🔑 [auth](services/auth) — *Authentication with JWT*
* 📓 [course](services/course) — *Course REST API*
* 🕵️‍♂️ [search](services/search) — *Search REST API using Elasticsearch*
* 👨‍🎨 [user](services/user) — *User REST API*
* 🦄 [web](services/web) — *SSR React web app with Next.js*
* 🔮 [websocket](services/websocket) — *Websockets with socket.io*

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
**Packages**
- [x] Events
- [x] Commands
- [ ] HTTP Api's client libraries with circuit breaker ([opossum](https://github.com/nodeshift/opossum))

**Services**
- [x] Move services from packages to services
- [x] Authenticate websocket requests
- [ ] Workers (eg. search indexers) with [queue groups](https://nats-io.github.io/docs/developer/concepts/queue.html)
- [ ] Caching
- [ ] Authorization with [express-jwt-permissions](https://github.com/MichielDeMey/express-jwt-permissions)
- [ ] Version message queue
- [ ] Notifications
- [ ] Emails
- [ ] Grades
- [ ] Feed
- [ ] Recommendation (search)
- [ ] ~~Graphql~~

**App**
- [x] Implement search
- [x] Implement course detail page

**Testing**
- [ ] Smoke test after build, before release
- [ ] Write tests and run through CI

**Operations**
- [ ] Logging
- [ ] Tracing
- [ ] Automate provisioning (db, servers, elastic etc.)
- [ ] Deployment
- [ ] Istio
- [ ] Autoscaling

**CI**
- [ ] Only build changed services
- [ ] [Build](https://engineering.docker.com/2019/04/multi-arch-images/) multiarch images

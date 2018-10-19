<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/129/speech-balloon_1f4ac.png" width="75"/>

_**AMQP** — An AMQP library with wrapper functions_

## Usage
Add this package to your `package.json`

```json
{
  "dependencies": {
    "@badmuts/aula-amqp": "1.0.0",
  }
}
```

Configure and start using AMQP

```js
const amqp = require('@badmuts/aula-amqp')

// Configure AMQP, in this case RabbitMQ
amqp.configure('amq.topic', 'rabbit', 5672, 'root', 'root')

// Use the router to easily handle requests
const AmqpRouter = amqp.Router('user-service')

// Handle user.create commands
AmqpRouter.command('user.create', (msg, successHandler, errorHandler) => {
    // create a user and call successHandler
    successHandler({ name: 'Gandalf' })
})
```

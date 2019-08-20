<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/198/military-medal_1f396.png" width="75"/>

_**Commands** — Shared commands constants used by services_

## Usage
Add this package to your `package.json`

```json
{
  "dependencies": {
    "@badmuts/aula-commands": "1.0.0"
  }
}
```

```js
const { CREATE_COURSE } = require('@badmuts/aula-commands')
// ...
nats.requestOne(CREATE_COURSE, null, {}, 1000, function(response) {
  // `NATS` is the library.
  if(response instanceof NATS.NatsError && response.code === NATS.REQ_TIMEOUT) {
    console.log('Request for help timed out.');
    return;
  }
  console.log('Got a response for help: ' + response);
})
```

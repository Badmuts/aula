<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/198/fireworks_1f386.png" width="75"/>

_**Events** — Shared events constants emitted by services_

## Usage
Add this package to your `package.json`

```json
{
  "dependencies": {
    "@badmuts/aula-events": "1.0.0"
  }
}
```

```js
const { COURSE_CREATED } = require('@badmuts/aula-events')
// ...
mq.publish(COURSE_CREATED, course)
```

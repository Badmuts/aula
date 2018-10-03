<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/129/earth-globe-europe-africa_1f30d.png" width="75"/>

_**Base server** — A basic [express.js](https://expressjs.com/) server which provides logging, cors and json body parsing_

## Usage
Add this package to your `package.json`

```json
{
  "dependencies": {
    "@badmuts/serverless-base-server": "1.0.0"
  }
}
```

And require it just like express

```js
const app = require('@badmuts/serverless-base-server')

app.get('/', (req, res, next) => res.json({
    message: 'Hello World!'
}))

module.exports = app

```

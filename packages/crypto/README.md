<img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/129/closed-lock-with-key_1f510.png" width="75"/>

_**Crypto** — Hashing and encryption package_

## Usage
Add this package to your `package.json`

```json
{
  "dependencies": {
    "@badmuts/aula-crypto": "1.0.0"
  }
}
```

And require it just like express

```js
const crypto = require('@badmuts/aula-crypto')

const password = 'Super-secure-password'

crypto.hash.hash(password)
    .then(hash => crypto.hash.compare(password, hash))
    .then(isEqual => console.log('Are passwords equal?', isEqual))
    .catch(console.error)
```

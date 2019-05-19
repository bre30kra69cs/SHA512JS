# sha512sha512

Simple and understandable package.

## Installation

```shell
$ npm install --save sha512sha512
```

In Node.js:
```js
// Load the full build.
var SHA = require('sha512sha512');

// To get result as BigNumber.js array
//message is n length string array with hex-like string
var message = {"00", "01", "02", ..., "ff"}[n]
var result = SHA.SHA512(message);

// To print result in human way view
SHA.result2print(result);
```

## Where did i get SHA-512 description?

Paper name: "Descriptions of SHA-256, SHA-384, and SHA-512"

Source: http://www.iwar.org.uk/comsec/resources/cipher/sha256-384-512.pdf

Only because you so pretty, i place this file in "sha512sha512/docs".

## Self PR

I create HMAC-SHA-512 package and base him on this project

Link: https://www.npmjs.com/package/hmac512hmac512

## How to use

Use function result2print(SHA512(hex-like string array)) and that's all. Very easy.

See the [package source](https://bitbucket.org/AndjeyS/cr-sha-512-js/) for more details.


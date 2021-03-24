# Cases API

Cases review API

## Installation

### Prerequisites

API requires __node v12.18.3__ or higher for ES2015 and async function support.

Use the package manager [npm](https://www.npmjs.com/package/npm) to install all dependencies.

```bash
npm i
```

## Getting started

To start de API use this command to use pre defined environment variables.
If you want you can change the environment variables

```js
./node_modules/.bin/env-cmd -f app.env npm start
```

env-cmd is to facilitate the process of environment variables

## What's included

Within the download you'll find the following directories and files

```
case-labeling#v0.0.1
├── src/
│   ├── controllers/
│   └── error_mappers/
│   └── interfaces/
│   └── middlewares/
│   └── app.js
│   └── index.js
│   └── validation.js
│
├── test/
│   ├── controllers/
│   ├── interfaces/
│   ├── hooks.js
│   ├── setup.js
│
```

## Running the tests

To run the tests please ensure the mongo db have some cases, if you run ```docker-compe up -d````in this directory you will be able to run this tests without problems

```js
npm run test
```

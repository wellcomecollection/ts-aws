# @weco/ts-aws

A set of ts-node TypeScript helpers for interacting with Wellcome Collection's AWS infrastructure

These aren't meant to be more generically useful outside of Wellcome Collection.

## Installation

  yarn add @weco/ts-aws

## Usage
If you are using this with [ts-node](https://github.com/TypeStrong/ts-node) you will need to configure it to not exclude this package as we don't compile to JS.

You can do this in your tsconfig:
```JSON
{
  "extends": "ts-node/node12/tsconfig.json",
  "ts-node": {
    "skipIgnore": true
  }
}
```

Then get ot writing your code
```TS
import { getCreds } from "@weco/ts-aws"

async function run() {
  const creds = getCreds("platform")
  const client = new SecretsManager(creds);
  // ...
}

run()

```

## Publishing

When a merge makes it to `main`, and the version in the `package.json` has been changed, a publish will be automatically triggered.


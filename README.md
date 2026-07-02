> [!Note]
> Following https://github.com/wellcomecollection/platform/issues/6416, this library is now fully deprecated and not in active use.

# @weco/ts-aws

A set of ts-node TypeScript helpers for interacting with Wellcome Collection's AWS infrastructure

These aren't meant to be more generically useful outside of Wellcome Collection.

## Installation

    yarn add @weco/ts-aws

## Example Usage

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

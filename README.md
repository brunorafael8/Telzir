# TELZIR

## Installation

```sh
yarn install
```

```sh
# Create package environments
cp packages/web/.env.example packages/web/.env
```

### NoteTWO: If you do not have mongodb installed, please install it:

### macOS

```sh
brew install mongodb
```

### Linux

Refer to the [installation instructions](https://docs.mongodb.com/manual/administration/install-on-linux/) for available Linux installation options.

## Start Development

Server:

```sh
# run server seed
yarn server:seed

yarn server
```

Front-end:

```sh
# first compile the relay and schemas
yarn update

# run web project
yarn web

```

# upgrader
A tool to upgrade your js/node libraries

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g upgrader
$ upgrader COMMAND
running command...
$ upgrader (--version)
upgrader/0.0.0 darwin-x64 node-v18.10.0
$ upgrader --help [COMMAND]
USAGE
  $ upgrader COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`upgrader up`](#upgrader-hello-person)
* [`upgrader hello world`](#upgrader-hello-world)
* [`upgrader help [COMMAND]`](#upgrader-help-command)


## `upgrader hello PERSON`

Say hello

```
USAGE
  $ upgrader hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/kofikodie/upgrader/blob/v0.0.0/dist/commands/hello/index.ts)_

## `upgrader hello world`

Say hello world

```
USAGE
  $ upgrader hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ upgrader hello world
  hello world! (./src/commands/hello/world.ts)
```

## `upgrader help [COMMAND]`

Display help for upgrader.

```
USAGE
  $ upgrader help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for upgrader.
```

<!-- commandsstop -->

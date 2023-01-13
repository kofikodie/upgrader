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
* [`upgrader up [PACKAGE_NAME] -v <version>`](#upgrader-up-packagename--v-version)
* [`upgrader help [COMMAND]`](#upgrader-help-command)


## `upgrader up [PACKAGE_NAME] -v <version>`

Upgrade a package to a specific version

```
USAGE
  $ upgrader up [PACKAGE_NAME] -v <version>

ARGUMENTS
  PACKAGE_NAME  package name

FLAGS
  -v, --version=<value>  version to upgrade to

DESCRIPTION
  Upgrade a package to a new version

EXAMPLES
  $ upgrader up react -v 17.0.2
  TO BE IMPLEMENT! (./src/commands/up.ts)
```

_See code: [dist/commands/up.ts](https://github.com/kofikodie/upgrader/blob/v0.0.0/src/commands/up.ts)_

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

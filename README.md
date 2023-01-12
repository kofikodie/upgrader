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
* [`upgrader hello PERSON`](#upgrader-hello-person)
* [`upgrader hello world`](#upgrader-hello-world)
* [`upgrader help [COMMAND]`](#upgrader-help-command)
* [`upgrader plugins`](#upgrader-plugins)
* [`upgrader plugins:install PLUGIN...`](#upgrader-pluginsinstall-plugin)
* [`upgrader plugins:inspect PLUGIN...`](#upgrader-pluginsinspect-plugin)
* [`upgrader plugins:install PLUGIN...`](#upgrader-pluginsinstall-plugin-1)
* [`upgrader plugins:link PLUGIN`](#upgrader-pluginslink-plugin)
* [`upgrader plugins:uninstall PLUGIN...`](#upgrader-pluginsuninstall-plugin)
* [`upgrader plugins:uninstall PLUGIN...`](#upgrader-pluginsuninstall-plugin-1)
* [`upgrader plugins:uninstall PLUGIN...`](#upgrader-pluginsuninstall-plugin-2)
* [`upgrader plugins update`](#upgrader-plugins-update)

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.22/src/commands/help.ts)_

## `upgrader plugins`

List installed plugins.

```
USAGE
  $ upgrader plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ upgrader plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.12/src/commands/plugins/index.ts)_

## `upgrader plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ upgrader plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ upgrader plugins add

EXAMPLES
  $ upgrader plugins:install myplugin 

  $ upgrader plugins:install https://github.com/someuser/someplugin

  $ upgrader plugins:install someuser/someplugin
```

## `upgrader plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ upgrader plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ upgrader plugins:inspect myplugin
```

## `upgrader plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ upgrader plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ upgrader plugins add

EXAMPLES
  $ upgrader plugins:install myplugin 

  $ upgrader plugins:install https://github.com/someuser/someplugin

  $ upgrader plugins:install someuser/someplugin
```

## `upgrader plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ upgrader plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ upgrader plugins:link myplugin
```

## `upgrader plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ upgrader plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ upgrader plugins unlink
  $ upgrader plugins remove
```

## `upgrader plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ upgrader plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ upgrader plugins unlink
  $ upgrader plugins remove
```

## `upgrader plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ upgrader plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ upgrader plugins unlink
  $ upgrader plugins remove
```

## `upgrader plugins update`

Update installed plugins.

```
USAGE
  $ upgrader plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->

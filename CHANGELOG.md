## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Types of changes

> `Added` - for new features.

> `Changed` - for changes in existing functionality.

> `Deprecated` - for soon-to-be removed features.

> `Removed` - for now removed features.

> `Fixed` - for any bug fixes.

> `Security` - in case of vulnerabilities.

## [Unreleased - 5.8.0] - 2021-09-01

## Added

- `@SimpleCommandOption` - added option type `INTEGER`, `MENTIONABLE`

## Fixed

- `@SimpleCommandOption` - option parsing

### Removed

- `@Name` - deprecated decorator
- `@Description` - deprecated decorator
- `CommandOption` - deprecated function
- `Command` - deprecated function
- `SelectMenu` - deprecated function
- `Button` - deprecated function
- `Group` - deprecated function
- `Choices` - deprecated function
- `Choice` - deprecated function
- `Option` - deprecated function
- `clearSlashes` - deprecated function
- `fetchSlash` - deprecated function
- `initSlashes` - deprecated function

## [5.7.0] - 2021-08-25

### Added

- added `command.isValid()` for simple command (false, if any option is undefined)

### Changed

- improved documentation

### Fixed

- `argSplitter` issue, where option output was not trimmed.
- `@SlashOption` now resolve objects for option like `USER, ROLE, CHANNEL, MENTIONABLE`, it will now not return snowflake id.

## [5.6.0] - 2021-08-18

### Added

- type `USER | ROLE | CHANNEL` added for [@SimpleCommandOption](https://oceanroleplay.github.io/discord.ts/docs/decorators/commands/simplecommandoption)
- [API docs](https://oceanroleplay.github.io/discord.ts/docs/api)

### Changed

- simple command name regex to `0-9a-z A-Z`
- improved documentation

### Fixed

- simple command execution
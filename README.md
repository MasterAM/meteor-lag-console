# alon:lag-console
[![Build Status](https://travis-ci.org/MasterAM/meteor-lag-console.svg?branch=master)](https://travis-ci.org/MasterAM/meteor-lag-console)

A plugin for `constellation:console` that provides a UI controls for `alon:lag-methods`.

It allows you to delay methods on the server in a clean way that only affects your development machine. 

## Installation

```sh
$ meteor add alon:lag-console
```

## Indroduction
Since development is often done on a powerful local machine without much load, the method call round-trip is usually very quick. Any UI changes that reflect the intermediate state often appear as a short flash of content before the view renders with the new data or state.

This behavior is different from the one that will be experienced by users of the production server, and therefore developers sometimes resort to quick and dirty ways for adding delay to their method calls (by calling `Meteor._sleepForMs()` - or dirtier solutions - directly in method code). If left alone and not cleaned up, it could eventually cause undesired delay of the deployed application.

This package is intended to provide a cleaner alternative to those dirty fixes.

The package adds delay to methods on the server only. Different delays can be configured for specific methods and the default delay can also be set (it is 2000ms by default).

##configuration
You may configure `alon:lag-methods` to your liking.

All of the config options (and other useful info) are specified in the [README file](https://github.com/MasterAM/meteor-lag-methods/blob/master/README.md).

The only thing that should be manually configured is the `persist` option, in case you want your configuration to survive server restarts (this option is off by default).
 

```json
{
  "lagMethods": {
    "persist": true,
  }
}
```
Note that turning this feature on creates a MongoDB collection on the development server.

## Usage
The package adds a tab to the Constellation panel.

This tab allows you to view and control almost all of the `alon:lag-method` options.

## Running tests

```sh
$ git clone https://github.com/MasterAM/meteor-lag-console.git
$ cd meteor-lag-console
$ meteor test-packages ./
```
and pointing your browser to the relevant URL (usually `http://localhost:3000`).

## Changelog

See the [changelog file].


[changelog file]: CHANGELOG.md "changelog file"

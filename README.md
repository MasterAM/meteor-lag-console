# alon:lag-console
[![Build Status](https://travis-ci.org/MasterAM/meteor-lag-console.svg?branch=master)](https://travis-ci.org/MasterAM/meteor-lag-console)


A plugin for `constellation:console` that provides a UI controls for `alon:lag-methods`.

It allows you to delay methods on the server in a clean way that only affects your development machine.

![main screenshot]

## Installation

```sh
$ meteor add alon:lag-console
```

## Indroduction
Since development is often done on a powerful local machine without much load, the method call round-trip is usually very quick. Any UI changes that reflect the intermediate state often appear as a short flash of content before the view renders with the new data or state.

This behavior is different from the one that will be experienced by users of the production server, and therefore developers sometimes resort to quick and dirty ways for adding delay to their method calls (by calling `Meteor._sleepForMs()` - or dirtier solutions - directly in method code). If left alone and not cleaned up, it could eventually cause undesired delay of the deployed application.

This package is intended to provide a cleaner alternative to those dirty fixes.

The package adds delay to methods on the server only. Different delays can be configured for specific methods and the default delay can also be set (it is 2000ms by default).

## Configuration
You may configure `alon:lag-methods` to your liking.

All of the config options (and other useful info) are specified in the [README file](https://github.com/MasterAM/meteor-lag-methods/blob/master/README.md).

The only thing that has to be manually configured is the `persist` option, in case you want your configuration to survive server restarts (this option is off by default).

In this case, just add this to your json config file.

```json
{
  "lagConfig": {
    "persist": true,
  }
}
```
Note that turning this feature on creates a MongoDB collection on the development server.

The delay is disabled on startup by default. To change this behavior, use change the following configuration option:

```json
{
  "lagConfig": {
    "console": {
      "disableOnStartup": false
    }
  }
}
```

## Usage
The package adds a tab to the Constellation panel.

This tab allows you to view and control almost all of the `alon:lag-method` options.

For the following examples, the following configuration file was used:

```json
{
  "lagMethods": {
    "defaultDelay": 1000,
    "methods": {
      "bar": 500
    },
    "exclude": [
      "baz"
    ],
    "log": true
  }
}
```
Assuming it is located in `<your app's root dir>/config/settings.json`, you can start Meteor with it by using the following command in your terminal:

```sh
$ meteor run --settings config/settings.json
```

Here are some short screencasts that demonstrate the functionality (the captured colors are a bit different from the actual screen colors).

**Note**: the UI in the current version is slightly different from the one in shown the examples below.

LagConsole v1.0 is coming soon and will include more functionality updated examples.

### enable
![01_enable]

Check and uncheck the `Enable` box in order to enable/disable the plugin.

If disabled, none or the method calls will be delayed.

### default delay
![02_default_delay]

The plugin has a default delay setting, which is specified in milliseconds.

If you set it to `0[ms]`, only methods that have custom delays will be delayed.

### per-method configuration options
![03_custom_method_intro]

Each method can be configured individually to have a custom delay or to be excluded and have no delay.

To the left of each method's name there are 2 small indicators/buttons:
* a red `d` button - stands for _delay_.
* a green `e` button - stands for _exclusion_.

Each of them shows a messaged when hovered.

The indicators are highlighted if there is a custom delay or if the method is excluded and are washed out otherwise.

The image above, hovering over the indicators shows that `foo` has no custom delay and is not excluded, and therefore will be delayed for the default time set (which is 1000 ms, as can be seen by looking at the value next to the activity indicator in the top-right corner).

The method `bar` has a custom 500ms delay set and is not excluded. The custom delay will override the default 1000ms delay, so `bar` will be delayed by 500ms when called..

Clicking the buttons sets the respective option. For more info, see the following sections.

### set a custom per-method delay
![04_set_custom_method_delay]

Setting a custom delay for a method is done by clicking on the `d` indicator, filling the desired delay (in milliseconds) and clicking the `set` button. The `d` indicator should appear highlighted and display the new custom dlay when hovered.

In the example screencast, at first `foo` has the default delay of 1000 ms. After setting a custom delay of 350ms, the indicator appears for a significantly shorter duration.

### exclude a method
![05_exclude_method]

Clicking the green `e` indicator toggles the corresponding method's `excluded` configuration.

An excluded mehtod will not be delayed.

Some methods are excluded by default, such as the ones that apply the configuration settings for this package.

### unset a custom per-method delay

![06_unset_custom_delay]

Unsetting a custom delay done in a is similar way to setting it.

Click on the `d` indicator and click on the `clr` button. The indicator goes dull and the custom delay is unset.

In the example above, `foo` had a 350ms delay that was removed, and now it is delayed for the default amount of time (1000 ms).


### set unblock
![07_set_unblock]

Calling [this.unblock()] in a method allows it to be run in parallel with other methods called by the user (when possible).

The `settings` button at the top right corner toggles the settings view.

When the settings view is visible, check/uncheck the `unblock` option to enable/disable this option.

In this example:
* `foo` has no custom settings, so it will be delayed for 1000 ms.
* `bar` has a custom delay of 500 ms.
* `baz` is excluded, and will threfore not be delayed.

The methods are called in the order `foo`>`bar`>`baz`.

**unblock enabled**

All of the methods run in parallel, so `baz` returns almost immediately, while `bar` runs and responds after 500 ms and `foo` finishes last, after 1000 ms.

![08_unblock_enabled]

**unblock disabled**

![09_unblock_disabled]

This time `foo` runs first, with a 1 second delay. Only after it is done, `bar` is processed. It is delayed for 500 more milliseconds and then `baz` starts running immediately, so `foo` returns approximately 1000 ms after the button is clicked and `bar` and `baz` return after approximately 1500ms.

### logging

![10_logging]

Tggle the `Logging` checkbox to enable/disable this option.

When enabled, the package will log each method call with the delay calculated for it based on its settings.


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
[this.unblock()]: http://docs.meteor.com/#/full/method_unblock
[main screenshot]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/00_main_screenshot.png
[01_enable]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/01_enable.gif "01 - enable"
[02_default_delay]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/02_default_delay.gif "02 - default_delay"
[03_custom_method_intro]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/03_custom_method_intro.gif "03 - custom_method_intro"
[04_set_custom_method_delay]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/04_set_custom_method_delay.gif "04 - set_custom_method_delay"
[05_exclude_method]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/05_exclude_method.gif "05 - exclude_method"
[06_unset_custom_delay]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/06_unset_custom_delay.gif "06 - unset_custom_delay"
[07_set_unblock]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/07_set_unblock.gif "07 - set_unblock"
[08_unblock_enabled]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/08_unblock_enabled.gif "08 - unblock_enabled"
[09_unblock_disabled]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/09_unblock_disabled.gif "09 - unblock_disabled"
[10_logging]: https://raw.githubusercontent.com/MasterAM/meteor-lag-console/media/10_logging.gif "10 - logging"

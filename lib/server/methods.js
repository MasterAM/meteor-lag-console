var configSpecs = {
  'log': 'boolean',
  'disable': 'boolean',
  'unblock': 'boolean',
  'defaultDelay': 'number'
};

var targetConfigSpecs = {
  'isExcluded': 'boolean',
  'delay': 'number'
};

var levels = ['base', 'publication', 'method'];


Meteor.methods({
  'lagConsole/setConfig': function (configName, value, level) {
    check(configName, Match.Where(function(x) {
      check(x, String);
      return configSpecs.hasOwnProperty(x)
    }));
    check(value, Match.Any);
    check(level, Match.Optional(Match.OneOf('base', 'publication', 'method')));
    level = level || 'base';

    if (typeof value === configSpecs[configName]) {
      configCollection.upsert({type: 'config', name: configName, level: level}, {$set: {value: value}});
    } else {
      throw new Meteor.Error('Wrong setting specified.');
    }
  },
  /**
   * Configure a single target (method/publication)
   * @param type the target type
   * @param name the target name
   * @param configName the configuration type to set
   * @param value the configuration value
   */
  'lagConsole/configTarget': function (type, name, configName, value) {
    var $set = {};

    check(type, String);
    check(name, String);
    check(configName, Match.Where(function(x) {
      check(x, String);
      return targetConfigSpecs.hasOwnProperty(x)
    }));
    check(value, Match.Any);

    $set[configName] = value;

    if (typeof value === targetConfigSpecs[configName]) {
      configCollection.upsert({type: type, name: name}, {$set: $set});
    } else if (targetConfigSpecs[configName] === "number" && typeof value === "undefined") {
      //unset a number
      configCollection.upsert({type: type, name: name}, {$unset: $set});
    } else {
      throw new Meteor.Error('Wrong setting specified.');
    }
  },
  'lagConsole/setHidden': function (type, name, value) {
    check(type, String);
    check(name, String);
    check(value, Boolean);
    namesCollection.upsert({type: type, name: name}, {$set: {hidden: value}});
  }
});
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
    level = level || 'base';
    check(level, String);
    if (configSpecs.hasOwnProperty(configName)
      && typeof value === configSpecs[configName]
      && _.contains(levels, level)) {
      configCollection.upsert({type: 'config', name: configName, level: level}, {$set: {value: value}});
    } else {
      throw new Meteor.Error('Wrong setting specified.');
    }
  },
  'lagConsole/configTarget': function (type, name, configName, value) {
    var $set = {};
    check(name, String);
    $set[configName] = value;
    if (targetConfigSpecs.hasOwnProperty(configName) && typeof value === targetConfigSpecs[configName]) {
      configCollection.upsert({type: type, name: name}, {$set: $set});
    } else if (targetConfigSpecs[configName] === "number" && typeof value === "undefined") {
      //unset a number
      configCollection.upsert({type: type, name: name}, {$unset: $set});
    } else {
      throw new Meteor.Error('Wrong setting specified.');
    }
  },
  'lagConsole/setHidden': function (type, name, value) {
    namesCollection.upsert({type: type, name: name}, {$set: {hidden: value}});
  }
});
'use strict';

publishAs(null, configCollectionName, function() {
  return configCollection.find();
});

publishAs(null, namesCollectionName, function() {
  return namesCollection.find();
});

var configSpecs = {
  'hidden': 'boolean', //console-specific config: is the target hidden from the list?
  'log': 'boolean',
  'disable': 'boolean',
  'unblock': 'boolean',
  'defaultDelay' : 'number'
};

var targetConfigSpecs = {
  'isExcluded': 'boolean',
  'delay' : 'number'
};

Meteor.methods({
  'lagConsole/setConfig': function(configName, value, level) {
    level = level || 'base';
    if (configSpecs.hasOwnProperty(configName) && typeof value === configSpecs[configName]) {
      configCollection.upsert({type: 'config', name: configName, level: level}, {$set: {value: value}});
    } else {
      throw new Meteor.Error('Wrong setting specified.');
    }
  },
  'lagConsole/configTarget': function (type, name, configName, value) {
    var $set = {};
    check (name, String);
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

/**
 * Publish a cursor as a set collection name.
 * @param {String} publicationName the name of the publication
 * @param {String} collectionName  the name of the collection to publish to
 * @param {Function} fn            a function that returns a cursor, just like the one passed to @link {Meteor#publish}
 */
function publishAs(publicationName, collectionName, fn) {
  Meteor.publish(publicationName, function() {
    var cursor = fn.apply(this, arguments);
    var self = this;
    if (cursor) {
      var handle = cursor.observeChanges({
        added: function (id, attributes) {
          //console.log('added',arguments);
          self.added(collectionName, id, attributes);
        },
        changed: function (id, attributes) {
          //console.log('changed', arguments);
          self.changed.call(self, collectionName, id, attributes);
        },
        removed: function (id) {
          //console.log('removed', arguments);
          self.removed.call(self, collectionName, id);
        }
      });
      self.onStop(function () {
        handle.stop();
      });
    }
    self.ready();
  });
}

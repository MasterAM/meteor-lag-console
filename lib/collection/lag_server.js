var api = Package['alon:lag-base'].API;
configCollection = api._getConfigCollection();
namesCollection = api._getNamesCollection();

api.setExclude('method', [
  'lagConsole/setConfig',
  'lagConsole/configTarget',
  'Constellation_update',
  'Constellation_duplicate',
  'Constellation_impersonate',
  'Constellation_remove',
  'Constellation_insert',
  'editableJSON_update'
], true);

publishAs(null, configCollectionName, function() {
  return configCollection.find();
});

publishAs(null, namesCollectionName, function() {
  return namesCollection.find();
});

var configSpecs = {
  'log': 'boolean',
  'disable': 'boolean',
  'unblock': 'boolean',
  'defaultDelay' : 'number'
};

var methodConfigSpecs = {
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
    if (methodConfigSpecs.hasOwnProperty(configName) && typeof value === methodConfigSpecs[configName]) {
      configCollection.upsert({type: type, name: name}, {$set: $set});
    } else if (methodConfigSpecs[configName] === "number" && typeof value === "undefined") {
      //unset a number
      configCollection.upsert({type: 'method', name: name}, {$unset: $set});
    } else {
      throw new Meteor.Error('Wrong setting specified.');
    }
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

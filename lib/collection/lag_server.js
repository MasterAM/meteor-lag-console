var lagMethods = Package['alon:lag-methods'].LagMethods;
lagCollection = lagMethods._getLagCollection();
methodCollection = lagMethods._getMethodCollection();
lagMethods.setExcludeForMethods([
  'lagConsole/setConfig',
  'lagConsole/configMethod'
], true);

publishAs(null, lagCollectionName, function() {
  return lagCollection.find();
});

publishAs(null, methodCollectionName, function() {
  return methodCollection.find();
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
  'lagConsole/setConfig': function(configName, value) {
    if (configSpecs.hasOwnProperty(configName) && typeof value === configSpecs[configName]) {
      lagCollection.upsert({type: 'config', name: configName}, {$set: {value: value}});
    } else {
      throw new Meteor.Error('Wrong setting specified.');
    }
  },
  'lagConsole/configMethod': function (methodName, configName, value) {
    var $set = {};
    check (methodName, String);
    $set[configName] = value;
    if (methodConfigSpecs.hasOwnProperty(configName) && typeof value === methodConfigSpecs[configName]) {
      lagCollection.upsert({type: 'method', name: methodName}, {$set: $set});
    } else if (methodConfigSpecs[configName] === "number" && typeof value === "undefined") {
      //unset a number
      lagCollection.upsert({type: 'method', name: methodName}, {$unset: $set});
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
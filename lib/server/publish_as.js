
/**
 * Publish a cursor as a set collection name.
 * @param {String} publicationName the name of the publication
 * @param {String} collectionName  the name of the collection to publish to
 * @param {Function} fn            a function that returns a cursor, just like the one passed to @link {Meteor#publish}
 */
publishAs = function (publicationName, collectionName, fn) {
  Meteor.publish(publicationName, function () {
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
};

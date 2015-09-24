/**
* Disable lag by default
*/

Meteor.startup(function () {
  lagCollection.upsert({type: 'config', name: 'disable'}, {$set: {value: true}});
});
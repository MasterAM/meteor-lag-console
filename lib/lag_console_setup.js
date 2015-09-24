/**
* Disable lag by default
*/

Meteor.startup(function () {
  lagCollection.upsert({type: 'config', name: 'disable'}, {$set: {value: true}});
  lagCollection.upsert({type: 'config', name: 'defaultDelay'}, {$set: {value: 1000}});
});
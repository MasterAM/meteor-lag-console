/**
* Disable lag by default
*/

var defaultsConfigs = {
  disableOnStartup: true
};

function configureConsole (){
  var configs = defaultsConfigs;
  var actualCollectionName = null;

  if (Meteor.settings && typeof Meteor.settings.lagMethods === "object") {
    configs = _.extend({}, defaultsConfigs, Meteor.settings.lagMethods.console || {});
  }

  if (configs.disableOnStartup) {
    Meteor.call('lagConsole/setConfig', 'disable', true);
  }
}

configureConsole();

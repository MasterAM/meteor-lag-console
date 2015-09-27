/** @namespace Meteor.settings.lagConfig */

var defaultsConfigs = {
  /**
   * Disable lag by default on startup
   */
  disableOnStartup: true
};

function configureConsole (){
  var configs = defaultsConfigs;

  if (Meteor.settings && typeof Meteor.settings.lagConfig === "object") {
    configs = _.extend({}, defaultsConfigs, Meteor.settings.lagConfig.console || {});
  }

  if (configs.disableOnStartup) {
    Meteor.call('lagConsole/setConfig', 'disable', true);
  }
}

configureConsole();

/** @namespace Meteor.settings.lagConfig */

var defaultsConfigs = {
  /**
   * Disable lag by default on startup
   */
  disableOnStartup: true
};

/**
 * Names of methods defined by constellation components.
 * Should be excluded and hidden from the method list.
 * @type {string[]}
 */
var constellationMethods = [
  'lagConsole/setConfig',
  'lagConsole/configTarget',
  'lagConsole/setHidden',
  'Constellation_update',
  'Constellation_duplicate',
  'Constellation_impersonate',
  'Constellation_remove',
  'Constellation_insert',
  'editableJSON_update'
];

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



api.setExclude('method', constellationMethods, true);
constellationMethods.forEach(function (name) {
  Meteor.call('lagConsole/setHidden', 'method', name, true);
});
Template.ConstellationLagHeader.helpers({
  /**
   * Whether or not the main activation option on.
   * @returns {boolean}
   */
  isActive: function () {
    var record = configCollection.findOne({type: 'config', name: 'disable', level: 'base'});
    if (record) {
      return !record.value;
    }
    return false;
  },
  /**
   * Whether or not both sub components are activeated.
   * @returns {String}
   */
  fullyActiveClass: function () {
    var record = configCollection.findOne({type: 'config', name: 'disable', level: {$not: 'base'}, value: true});
    return record ? 'constellation-lag-partial': 'constellation-lag-full';
  },

  delay: function () {
    var record = configCollection.findOne({type: 'config', name: 'defaultDelay', level: 'base'});
    if (record) {
      return record.value;
    }
    return 0;
  }
});

Template.ConstellationLagHeader.events({
  'click button[data-action=toggle-settings]': function (e, tpl) {
    var current = uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
    uiState.set(uiStateKeys.IS_SETTINGS_TAB_ACTIVE, !current);
  },
  'click span[data-action=toggle-active]': function (e, tpl) {
    e.stopPropagation();
	var record = configCollection.findOne({type: 'config', name: 'disable'});
	var val = record && record.value || false;
    Meteor.call('lagConsole/setConfig', 'disable', !val);
  }
});

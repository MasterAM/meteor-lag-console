Template.ConstellationLagHeader.helpers({
  isActive: function () {
    var record = lagCollection.findOne({type: 'config', name: 'disable'});
    if (record) {
      return !record.value;
    }
    return false;
  },
  delay: function () {
    var record = lagCollection.findOne({type: 'config', name: 'defaultDelay'});
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
	var record = lagCollection.findOne({type: 'config', name: 'disable'});
	var val = record && record.value || false;
    Meteor.call('lagConsole/setConfig', 'disable', !val);
  },
});

//Template.ConstellationLagHeader.onCreated(function () {
//
//});
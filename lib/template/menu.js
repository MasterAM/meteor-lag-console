Template.ConstellationLagMenu.events({
  'click div[data-action=toggle-settings], click strong[data-action=toggle-settings]': function (e, tpl) {
	e.stopPropagation();
    var current = uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
    uiState.set(uiStateKeys.IS_SETTINGS_TAB_ACTIVE, !current);
	Tracker.flush();
	$('.constellation-lag-config').find('input[type=number]').focus();
  },
  'click div.constellation-lag-menu' : function (e, tpl) {
	var settingsViewEnabled = uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
	if (settingsViewEnabled) {
	  uiState.set(uiStateKeys.IS_SETTINGS_TAB_ACTIVE, !settingsViewEnabled);
	}
	var clickedTheActivateButton = tpl.$(e.target).data('action') === 'activate';
	var record = configCollection.findOne({type: 'config', name: 'disable'});
	var disabled = record && record.value || false;
	if ((!settingsViewEnabled && (clickedTheActivateButton || !disabled)) || clickedTheActivateButton) {
      Meteor.call('lagConsole/setConfig', 'disable', !disabled);
	}
  }
});

Template.ConstellationLagMenu.helpers({
  /*toggleOptions: [
    {
      name: 'disable',
      label: 'Enable',
      title: 'Enable lag-methods',
      inverse: true
    },
    {
      name: 'log',
      label: 'Logging',
      title: 'Enable logging',
      inverse: false
    }
  ],*/
  settingsClass: function () {
    return uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE) ? 'active' : 'inactive';
  },
  defaultDelay: function () {
	var record = configCollection.findOne({type: 'config', name: 'defaultDelay'});
    if (record) {
      return record.value;
    }
    return 0;  
  },
  isActive: function () {
    var record = configCollection.findOne({type: 'config', name: 'disable'});
    if (record) {
      return !record.value;
    }
    return false;
  }
});
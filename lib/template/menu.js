Template.ConstellationLagMenu.events({
  'click button[data-action=change-default-delay]': function (e, tpl) {
    console.log(e, tpl, this);
  },
  'click button[data-action=toggle-settings]': function (e, tpl) {
    var current = uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
    uiState.set(uiStateKeys.IS_SETTINGS_TAB_ACTIVE, !current);
  }
});

Template.ConstellationLagMenu.helpers({
  toggleOptions: [
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
  ],
  settingsClass: function () {
    return uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE) ? 'active' : 'inactive';
  }
});
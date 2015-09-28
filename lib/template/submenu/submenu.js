Template.ConstellationLagSubMenu.events({
});

Template.ConstellationLagSubMenu.helpers({
  tabOptions: [
    {
      label: 'm',
      title: 'Show Methods',
      type: 'method'
    },
    {
      label: 'p',
      title: 'Show Publications',
      type: 'publication'
    }
  ],

  shouldShow: function () {
    return !uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
  },

  activeType: function () {
    return uiState.get(uiStateKeys.ACTIVE_CONTENT_TAB);
  }
});
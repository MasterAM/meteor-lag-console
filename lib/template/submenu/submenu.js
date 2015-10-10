Template.ConstellationLagSubMenu.events({
  'input input[data-action=filter]': function (e, tpl) {
    var value = tpl.find('input[data-action=filter]').value;
    uiState.set(uiStateKeys.FILTER, value);
  }
});

Template.ConstellationLagSubMenu.helpers({
  tabOptions: [
    {
      label: 'M',
      title: 'Show Methods',
      type: 'method'
    },
    {
      label: 'P',
      title: 'Show Publications',
      type: 'publication'
    }
  ],

  shouldShow: function () {
    return !uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
  },

  activeType: function () {
    return uiState.get(uiStateKeys.ACTIVE_CONTENT_TAB);
  },
  filterText: function () {
    return uiState.get(uiStateKeys.FILTER);
  }
});
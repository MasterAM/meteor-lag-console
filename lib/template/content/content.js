Template.ConstellationLagContent.helpers({
  showSettings: function() {
    return uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
  },
  methodNames: function () {
    return namesCollection.find({type: 'method'});
  }
});

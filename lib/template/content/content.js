Template.ConstellationLagContent.helpers({
  showSettings: function() {
    return uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
  },
  targetNames: function () {
    return namesCollection.find({
      type: uiState.get(uiStateKeys.ACTIVE_CONTENT_TAB),
      hidden: {$ne: true}
    });
  }
});

Template.ConstellationLagContent.helpers({
  showSettings: function() {
    return uiState.get(uiStateKeys.IS_SETTINGS_TAB_ACTIVE);
  },
  targetNames: function () {
    var filter = uiState.get(uiStateKeys.FILTER);
    var type = uiState.get(uiStateKeys.ACTIVE_CONTENT_TAB);
    var selector = {
      type: type,
      hidden: {$ne: true}
    };
    if (filter) {
      try {
        selector.name = {
          $regex: new RegExp(filter, 'i')
        };
      } catch (e) {
        // If for some reason the regex is messed up just fall back to this
        selector.name = filter;
      }
    }
    return namesCollection.find(selector);
  }
});

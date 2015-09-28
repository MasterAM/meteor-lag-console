Template.ConstellationLagSubMenuTab.events({
  "click .constellation-tab": function (e, tpl) {
    uiState.set(uiStateKeys.ACTIVE_CONTENT_TAB, this.type);
  }
});

Template.ConstellationLagSubMenuTab.helpers({
  activeClass: function() {
    return uiState.equals(uiStateKeys.ACTIVE_CONTENT_TAB, this.type) ? 'active': 'inactive';
  }
});
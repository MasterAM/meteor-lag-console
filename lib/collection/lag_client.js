configCollection = new Mongo.Collection(configCollectionName);
namesCollection = new Mongo.Collection(namesCollectionName);

uiState = new ReactiveDict('alon:lag-console');
uiStateKeys = {
  IS_SETTINGS_TAB_ACTIVE: 'isSettingsTabActive',
  ACTIVE_CONTENT_TAB: 'activeContentTab',
  FILTER: 'filter'
};

uiState.setDefault(uiStateKeys.IS_SETTINGS_TAB_ACTIVE, false);
uiState.setDefault(uiStateKeys.ACTIVE_CONTENT_TAB, 'method');
uiState.setDefault(uiStateKeys.FILTER, '');
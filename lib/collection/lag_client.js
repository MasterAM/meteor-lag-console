configCollection = new Mongo.Collection(configCollectionName);
namesCollection = new Mongo.Collection(namesCollectionName);

uiState = new ReactiveDict('alon:lag-console');
uiStateKeys = {
  IS_SETTINGS_TAB_ACTIVE: 'isSettingsTabActive'
};

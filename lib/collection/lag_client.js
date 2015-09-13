lagCollection = new Mongo.Collection(lagCollectionName);
methodCollection = new Mongo.Collection(methodCollectionName);
uiState = new ReactiveDict('alon:lag-console');
uiStateKeys = {
  IS_SETTINGS_TAB_ACTIVE: 'isSettingsTabActive'
};

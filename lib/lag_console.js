var Constellation = Package["constellation:console"].API;

Constellation.addTab({
  name: 'Lag control',
  id: 'lag-control',
  mainContentTemplate: 'ConstellationLagContent',
  menuContentTemplate: 'ConstellationLagMenu',
  headerContentTemplate: 'ConstellationLagHeader'
});

Constellation.hideCollection(configCollectionName);
Constellation.hideCollection(namesCollectionName);

var Constellation = Package["constellation:console"].API;

Constellation.addTab({
  name: 'Lag control',
  id: 'lag-control',
  mainContentTemplate: 'ConstellationLagContent',
  menuContentTemplate: 'ConstellationLagMenu',
  subMenuContentTemplate: 'ConstellationLagSubMenu',
  headerContentTemplate: 'ConstellationLagHeader'
});

Constellation.hideCollection(configCollectionName);
Constellation.hideCollection(namesCollectionName);

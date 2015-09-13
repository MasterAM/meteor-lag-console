var Constellation = Package["constellation:console"].API;

Constellation.addTab({
  name: 'Lag control',
  mainContentTemplate: 'ConstellationLagContent',
  menuContentTemplate: 'ConstellationLagMenu',
  headerContentTemplate: 'ConstellationLagHeader'
});

Constellation.hideCollection(lagCollectionName);
Constellation.hideCollection(methodCollectionName);

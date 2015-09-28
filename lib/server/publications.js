'use strict';

publishAs(null, configCollectionName, function () {
  return configCollection.find();
});

publishAs(null, namesCollectionName, function () {
  return namesCollection.find();
});

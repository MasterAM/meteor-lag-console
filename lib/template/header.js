Template.ConstellationLagHeader.helpers({
  isActive: function () {
    var record = lagCollection.findOne({type: 'config', name: 'disable'});
    if (record) {
      return !record.value;
    }
    return false;
  },
  delay: function () {
    var record = lagCollection.findOne({type: 'config', name: 'defaultDelay'});
    if (record) {
      return record.value;
    }
    return 0;
  }
});

//Template.ConstellationLagHeader.onCreated(function () {
//
//});
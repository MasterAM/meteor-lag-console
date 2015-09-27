Template.ConstellationLagToggleOption.events({

  'click input[data-action=toggle-config]': function (e, tpl) {
    var val = !!e.target.checked;
    if (this.inverse) {
      val = !val;
    }
    e.preventDefault();
    Meteor.call('lagConsole/setConfig', this.name, val);
  }
});

Template.ConstellationLagToggleOption.helpers({
  isActive: function () {
    var record = lagCollection.findOne({type: 'config', name: this.name});
    var value;
    if (record) {
      value = record.value;
      if (this.inverse) {
        value = !value;
      }
      return value ? 'checked' : '';
    }
    console.warn(this.name, 'not found in collection');
    return '';
  },
  id: function (){
    return "constellation-lag-toggle-" + this.name.toLowerCase().replace(" ", "-");
  }
});

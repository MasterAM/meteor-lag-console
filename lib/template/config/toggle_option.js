Template.ConstellationLagToggleOption.events({

  'click input[data-action=toggle-config]': function (e, tpl) {
    var val = !!e.target.checked;
    if (this.inverse) {
      val = !val;
    }
    e.preventDefault();
    Meteor.call('lagConsole/setConfig', this.name, val, this.level);
  }
});

Template.ConstellationLagToggleOption.helpers({
  isActive: function () {
    var record = configCollection.findOne({type: 'config', name: this.name, level: this.level});
    var value;
    var found = false;
    if (record) {
      value = record.value;
      found = true;
    } else if (typeof this.defaultValue !== 'undefined') {
      value = this.defaultValue;
      found = true;
    }
    if (found) {
      if (this.inverse) {
        value = !value;
      }
      return value ? 'checked' : '';
    }
    console.warn(this.name, 'not found in collection');
    return '';
  },
  id: function (){
    var slug = this.name + "-" + this.level;
    return "constellation-lag-toggle-" + slug.toLowerCase().replace(" ", "-");
  }
});

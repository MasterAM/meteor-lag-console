Template.ConstellationLagContentTarget.events({
  'click i[data-action=toggle-excluded]': function (e, tpl) {
    var name = tpl.data.name;
    var type = tpl.data.type;
    var target = configCollection.findOne({type: type, name: name});
    var isExcluded = false;
    if (target) {
      isExcluded = target.isExcluded;
    }
    Meteor.call('lagConsole/configTarget', type, name, 'isExcluded', !isExcluded);
  },
  'click i[data-action=toggle-delayed]': function (e, tpl) {
    var d = tpl.data;
    console.log('poo', this, arguments, d);
    if (this.delay) {
      Meteor.call('lagConsole/configTarget', d.type, d.name, 'delay');
      return;
    }
    var isEditing = tpl.isEditing.get();
    tpl.isEditing.set(!isEditing);
    Tracker.flush();
    tpl.$(e.target).closest('.target-lag-item').find('input').focus();
  },
  'keypress input[type=number]': function (e, tpl) {
    var name, type, value, delay;
    if (e.keyCode === 27) {
      tpl.isEditing.set(false);
      return;
    }
    name = tpl.data.name;
    type = tpl.data.type;
    if (e.keyCode === 13) {
      delay = tpl.find('input[name=delay]').value;
      if (delay === '') {
        Meteor.call('lagConsole/configTarget', type, name, 'delay');
        tpl.isEditing.set(false);
        return;
      }
      value = parseInt(delay, 10);
      if (!isNaN(value) && value >= 0) {
        Meteor.call('lagConsole/configTarget', type, name, 'delay', value);
        tpl.isEditing.set(false);
      } else {
        console.warn('invalid delay specified!');
      }
    }
  }
});

Template.ConstellationLagContentTarget.helpers({
  details: function () {
    var selector = {type: this.type, 'name': this.name};
    return configCollection.findOne(selector) || selector;
  },
  hasLag: function () {
    return typeof this.delay === 'number';
  },
  isEditing: function () {
    var tmpl = Template.instance();
    return tmpl.isEditing.get();
  },
  delayData: function () {
    var output;
    if (this.delay) {
      output = {
        className: 'enabled',
        title: this.delay + '[ms] custom delay',
        delay: this.delay
      }
    } else {
      output = {
        className: 'disabled',
        title: 'No custom delay'
      };
    }
    return output;
  },
  excludeData: function () {
    var output;
    if (this.isExcluded) {
      output = {
        className: 'enabled',
        title: 'This ' + this.type + ' is excluded. \nIt will not be delayed, even if custom delay is set for it.'
      }
    } else {
      var record = configCollection.findOne({type: 'config', name: 'disable'});
      var disabled = record && record.value || false;
      output = {
        className: 'disabled',
        title: (!disabled) ? 'This '+this.type+' is delayed' : 'No delay (globally disabled)'
      };
    }
    return output;
  },
  displayName: function () {
    return this.name || '[universal publications]';
  }

});

Template.ConstellationLagContentTarget.onCreated(function () {
  this.isEditing = new ReactiveVar(false);
});

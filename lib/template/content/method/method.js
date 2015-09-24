Template.ConstellationLagContentMethods.events({
  'click i[data-action=toggle-excluded]': function (e, tpl) {
    var name = tpl.data.name;
    var method = lagCollection.findOne({type: 'method', name: name});
    var isExcluded = false;
    if (method) {
      isExcluded = method.isExcluded;
    }
    Meteor.call('lagConsole/configMethod', name, 'isExcluded', !isExcluded);
  },
  'click i[data-action=toggle-delayed]': function (e, tpl) {
    var isEditing = tpl.isEditing.get();
    tpl.isEditing.set(!isEditing);
	Tracker.flush();
	tpl.$(e.target).closest('.method-lag-item').find('input').focus();
  },
  'keypress input[type=number]': function(e, tpl) {
	if (e.keyCode === 27) {
	  tpl.isEditing.set(false);
	  return;
	}
	if (e.keyCode === 13) {
	  var name = tpl.data.name;
	  if (tpl.find('input[name=delay]').value === '') {
		Meteor.call('lagConsole/configMethod', name, 'delay');
		tpl.isEditing.set(false);
		return;
	  }
	  var value = parseInt(tpl.find('input[name=delay]').value, 10);
	  var name = tpl.data.name;
	  if (!isNaN(value) && value >= 0) {
		Meteor.call('lagConsole/configMethod', name, 'delay', value);
		tpl.isEditing.set(false);
	  } else {
		console.warn('invalid delay specified!');
	  }
	}
  }/*,
  'click button[data-action=clear-delay]': function(e, tpl) {
    var name = tpl.data.name;
    Meteor.call('lagConsole/configMethod', name, 'delay');
    tpl.isEditing.set(false);
  },
  'click button[data-action=cancel-delay]': function(e, tpl) {
    tpl.isEditing.set(false);
  }*/
});

Template.ConstellationLagContentMethods.helpers({
  details: function() {
    return lagCollection.findOne({type: 'method', 'name': this.name}) || {name: this.name};
  },
  hasLag: function () {
    return typeof this.delay === 'number';
  },
  isEditing: function() {
    var tmpl = Template.instance();
    return tmpl.isEditing.get();
  },
  delayData: function() {
    var output;
    if (this.delay) {
      output = {
        className: 'enabled',
        title: this.delay+'[ms] delay'
      }
    } else {
      output = {
        className: 'disabled',
        title: 'No custom delay'
      };
    }
    return output;
  },
  excludeData: function() {
    var output;
    if (this.isExcluded) {
      output = {
        className: 'enabled',
        title: 'This method will not be delayed, even if it has a delay set to it'
      }
    } else {
	  var record = lagCollection.findOne({type: 'config', name: 'disable'});
	  var disabled = record && record.value || false;
      output = {
        className: 'disabled',
        title: (!disabled) ? 'This method is delayed' : 'No delay'
      };
    }
    return output;
  }
});

Template.ConstellationLagContentMethods.onCreated(function() {
  this.isEditing = new ReactiveVar(false);
});
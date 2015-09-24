Template.ConstellationLagConfig.events({
  'input input[type=number]': function (e, tpl) {
    var value = (tpl.find('input[name=default-delay]').value) ? parseInt(tpl.find('input[name=default-delay]').value, 10) : 0;
    if (!isNaN(value) && value >= 0) {
      Meteor.call('lagConsole/setConfig', 'defaultDelay', value);
    } else {
      console.warn('invalid delay specified!');
    }
  }
});

Template.ConstellationLagConfig.helpers({
  toggleOptions: [
    {
      name: 'disable',
      label: 'Activate lag-methods',
      title: 'Activate lag-methods',
      inverse: true
    },
    {
      name: 'unblock',
      label: 'Unblock',
      title: 'Use Method.unblock() to allow methods to run in parallel',
      inverse: false
    },
    {
      name: 'log',
      label: 'Logging',
      title: 'Enable logging',
      inverse: false
    }
  ],
  defaultDelay: function () {
	var record = lagCollection.findOne({type: 'config', name: 'defaultDelay'});
    if (record) {
      return record.value;
    }
    return 0;  
  }
});
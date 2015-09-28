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
      label: 'Activate',
      title: 'Main activation control',
      inverse: true,
      level: 'base'
    },
    {
      name: 'unblock',
      label: 'Unblock',
      title: 'Use Method.unblock() to allow methods to run in parallel',
      inverse: false,
      level: 'base'
    },
    {
      name: 'log',
      label: 'Logging',
      title: 'Enable logging',
      inverse: false,
      level: 'base'
    }
  ],
  specificOptions: [
    {
      name: 'disable',
      label: 'Activate lag-methods',
      title: 'Activate lag-methods',
      inverse: true,
      level: 'method',
      defaultValue: false
    },
    {
      name: 'disable',
      label: 'Activate lag-publications',
      title: 'Activate lag-publications',
      inverse: true,
      level: 'publication',
                      defaultValue: false
    }
  ],

  defaultDelay: function () {
	var record = configCollection.findOne({type: 'config', name: 'defaultDelay'});
    if (record) {
      return record.value;
    }
    return 0;  
  }
});
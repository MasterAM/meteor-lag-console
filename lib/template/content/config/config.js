Template.ConstellationLagConfig.events({
  'click input[data-action=toggle-config]': function (e, tpl) {
    var val = !!e.target.checked;
    if (this.inverse) {
      val = !val;
    }
    e.preventDefault();
    Meteor.call('lagConsole/setConfig', this.name, val);
  },
  'click button[data-action=change-default-delay]': function (e, tpl) {
    var value = parseInt(tpl.find('input[name=default-delay]').value, 10);
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
      label: 'Enable',
      title: 'Enable lag-methods',
      inverse: true
    },
    {
      name: 'unblock',
      label: 'Unblock',
      title: 'Use Method.unblock() to allow methods to run in parallel',
      inverse: false
    }
  ]
});
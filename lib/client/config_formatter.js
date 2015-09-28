SubConfig = function (type) {
  this.type = type;
};

/**
 * Gets an object that represents the current state of configs.
 * @returns {{delays: {}, exclude: Array, forceBlocking: Array}}
 */
SubConfig.prototype.getConfigs = function () {
  var configs = {
    delays: {},
    exclude: [],
    forceBlocking: []
  };
  var simpleConfigs = configCollection.find({type: 'config', level: this.type}, {reactive: false}).fetch();
  var specializedConfigs = configCollection.find({type: this.type}, {reactive: false}).fetch();
  simpleConfigs.forEach(function (config) {
    configs[config.name] = config.value;
  });

  specializedConfigs.forEach(function (target) {
    if (target.delay) {
      configs.delays[target.name] = target.delay;
    }
    if (target.isExcluded) {
      configs.exclude.push(target.name);
    }
    if (target.isBlocking) {
      configs.forceBlocking.push(target.name);
    }
  });
  return configs;
};

BaseConfig = function () {
  this.type = 'base';
};

/**
 * Gets an object that represents the current state of configs.
 * @returns {Object}
 */
BaseConfig.prototype.getConfigs = function () {
  var configs = {};
  var simpleConfigs = configCollection.find({type: 'config', level: this.type}, {reactive: false}).fetch();
  simpleConfigs.forEach(function (config) {
    configs[config.name] = config.value;
  });

  return configs;
};

ConfigFormatter = function() {
  this.configs = ['base', 'methods', 'publications'];
  this.configurators = {
    base: new BaseConfig(),
    methods: new SubConfig('method'),
    publications: new SubConfig('publication')
  }
};

ConfigFormatter.prototype.getConfigs = function () {
  var configs = {};
  var self = this;
  this.configs.forEach(function (type) {
    configs[type] = self.configurators[type].getConfigs();
  });
  return configs;
};
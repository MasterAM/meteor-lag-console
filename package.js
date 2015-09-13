Package.describe({
  name: 'alon:lag-console',
  summary: 'A plugin for constellation that adds delay to method calls on your dev machine.',
  version: '0.1.0',
  git: 'https://github.com/MasterAM/meteor-lag-console',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.use('check');
  api.use('alon:lag-methods@0.3.0');
  api.use(['templating','reactive-dict', 'reactive-var', 'tracker'], 'client');
  api.use('underscore');
  api.use('mongo');
  api.use('constellation:console@1.2.1', 'client');

  api.addFiles(['lib/collection/lag_both.js'], ['client', 'server']);
  api.addFiles([
    'lib/collection/lag_client.js',
    'lib/template/header.html',
    'lib/template/header.js',
    'lib/template/header.css',
    'lib/template/menu.html',
    'lib/template/menu.js',
    'lib/template/menu.css',
    'lib/template/config/toggle_option.html',
    'lib/template/config/toggle_option.js',
    'lib/template/config/toggle_option.css',
    'lib/template/content/content.html',
    'lib/template/content/content.js',
    'lib/template/content/content.css',
    'lib/template/content/method/method.html',
    'lib/template/content/method/method.js',
    'lib/template/content/method/method.css',
    'lib/template/content/config/config.html',
    'lib/template/content/config/config.js',
    'lib/template/content/config/config.css',
    'lib/lag_console.js'
  ], 'client');
  api.addFiles(['lib/collection/lag_server.js'], 'server');

  api.imply('constellation:console');

  api.export('lagCollection', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('alon:lag-console');
  api.addFiles('tests/server/configs.js', 'server');
  api.addFiles('tests/server/server-test.js', 'server');
  api.addFiles('tests/client/client-test.js', 'client');
});

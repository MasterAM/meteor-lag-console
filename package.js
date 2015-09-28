Package.describe({
  name: 'alon:lag-console',
  summary: 'A plugin for constellation that simulates network lag on your dev machine.',
  version: '1.0.0',
  git: 'https://github.com/MasterAM/meteor-lag-console',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.use(['check', 'underscore'], 'server');
  api.use('alon:lag-methods@1.0.0');
  api.use('alon:lag-publications@1.0.0');
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
    'lib/template/submenu/submenu.html',
    'lib/template/submenu/submenu.js',
    'lib/template/submenu/submenu.css',
    'lib/template/submenu/tab/tab.html',
    'lib/template/submenu/tab/tab.js',
    'lib/template/submenu/tab/tab.css',
    'lib/template/config/toggle_option.html',
    'lib/template/config/toggle_option.js',
    'lib/template/config/toggle_option.css',
    'lib/template/content/content.html',
    'lib/template/content/content.js',
    'lib/template/content/content.css',
    'lib/template/content/target/target.html',
    'lib/template/content/target/target.js',
    'lib/template/content/target/target.css',
    'lib/template/content/config/config.html',
    'lib/template/content/config/config.js',
    'lib/template/content/config/config.css',
    'lib/client/lag_console.js'
  ], 'client');
  api.addFiles([
    'lib/server/globals.js',
    'lib/collection/lag_server.js',
    'lib/server/lag_console_setup.js'
  ], 'server');

  api.imply('constellation:console');

  api.export('configCollection', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('alon:lag-console');
  api.addFiles('tests/server/configs.js', 'server');
  api.addFiles('tests/server/server-test.js', 'server');
  api.addFiles('tests/client/client-test.js', 'client');
});

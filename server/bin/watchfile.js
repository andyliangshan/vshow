/**
 * 记录文件改动
 */

var watchman = require('fb-watchman');
var client = new watchman.Client();
var path = require('path');

var dir_of_interest = path.join(__dirname, '../../');

/**
 * capabilityCheck 检测服务功能
 */
client.capabilityCheck({optional: [], required: ['relative_root']},
  function (error, resp) {
    if (error) {
      console.log(error);
      client.end();
      return;
    }
    // 初始化 watch
    client.command(['watch-project', dir_of_interest],
      function (error, resp) {
        if (error) {
          console.error('Error initiating watch:', error);
          return;
        }
        if ('warning' in resp) {
          console.log('warning: ', resp.warning);
        }
        // `watch-project' 根据维护树的等级合并监控
        console.log('watch established on ', resp.watch,
          ' relative_path', resp.relative_path);
      });
  });

function make_subscription(client, watch, relative_path) {
  sub = {
    // 匹配所有 `.js`
    expression: ["allof", ["match", "*.js"]],
    // 监控的 有关文件特性
    fields: ["name", "size", "exists", "type"]
  };
  if (relative_path) {
    sub.relative_root = relative_path;
  }

  client.command(['subscribe', watch, 'huracan', sub],
    function (error, resp) {
      if (error) {
        console.error('failed to subscribe: ', error);
        return;
      }
      console.log('subscription ' + resp.subscribe + ' established');
    });

  /**
   * ```resp
   * { root: '/private/tmp/foo',
   *   subscription: 'mysubscription',
   *   files: [{name: 'node_modules/fb-watchman/site.js',size: 4768,exists: true,type: 'f'}]
   * }
   * ```
   */
  client.on('subscription', function (resp) {
    for (var i in resp.files) {
      var f = resp.files[i];
      if (resp.subscription == 'huracan') {
        console.log('file changed: \nname: ' + f.name + '\nsize: ' + f.size + '\nexists: ' + f.exists + '\ntype: ' + f.type + '\n\n');
      }
    }
  });
}

function make_time_constrained_subscription(client, watch, relative_path) {
  /**
   * 向服务发出监控命令
   */
  client.command(['clock', watch], function (error, resp) {
    if (error) {
      console.error('Failed to query clock:', error);
      return;
    }

    var sub = {
      expression: ["allof", ["match", "*.*"]],
      fields: ["name", "size", "exists", "type"],
      // 添加时间约束
      since: resp.clock
    };

    if (relative_path) {
      sub.relative_root = relative_path;
    }

    client.command(['subscribe', watch, 'huracan', sub],
      function (error, resp) {
        if (error) {
          console.error('failed to subscribe: ', error);
          return;
        }
        console.log('subscription ' + resp.subscribe + ' established');
      });

    client.on('subscription', function (resp) {
      for (var i in resp.files) {
        var f = resp.files[i];
        if (resp.subscription == 'huracan') {
          console.log('file changed: \nname: ' + f.name + '\nsize: ' + f.size + '\nexists: ' + f.exists + '\ntype: ' + f.type + '\n\n');
        }
      }
    });

    /** 会打印很多冗长日志
     client.command(['log-level', 'debug']);
     client.on('log', function(info) {
      console.log(info);
    });
     */
  });
}

//make_subscription(client, dir_of_interest);
make_time_constrained_subscription(client, dir_of_interest);

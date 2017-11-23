export default (config) => ({
  compiler_public_path: `http://${config.server_host}:${config.server_port}/`,

  //  ------Loader assets--------
  mini_assets: false,
  site_static_host: '',  //  静态服务器地址,可cdn加速替换
  //  ------Loader end------------
  debug: true,
  apiTimeout: 10000,

  //  newrelic
  newrelic_key: '',

  //  page image base url
  imgBaseUrl: '',
  imgBaseU: '',
});

git 仓库获取代码

## 服务器配置
### 服务器以外重启时 需要启动依赖的服务
  * redis-server /etc/redis.conf  启动redis
  * node=6.x 编译； node=0.12 pm2 启动


####
npm install 

######
启动  gulp  本地启动(node === 0.12.0)
打包  gulp build 


1.sempc项目从git仓库clone到本地，然后执行gulp启动项目

2.public是静态文件，有css,js,image

3.server中有路由配置（routers），控制器（controllers），页面模版view。

4.gulpfile里面是构建，interface.josn是接口。interface.md有接口文档。

5.app.js有启动项目的条件。









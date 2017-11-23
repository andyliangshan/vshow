# 接口说明

## 英国专业 商科 理工 文科 艺术


```
uk:
http://api.liuxue.com/article/channel?station= immigrate

移民 - 国家【catalog_id为国家编号】
http://api.liuxue.com/article/channel?station=immigrate&catalog_id=324

移民 - 国家 - 类别
http://api.liuxue.com/article/page?station=immigrate&catalog_id=324
```

## 子域名国家

```
station: 国家缩写
http://api.liuxue.com/article/channel?station=usa

catalog_id: 类别编号
http://api.liuxue.com/article/pages?station=usa&catalog_id=1
```

## 主站下国家

```
station: 固定为www
catalog_id: 国家编号
http://api.liuxue.com/article/channel/?station=www&catalog_id=1

catalog_id: 类别编号
http://api.liuxue.com/article/pages?station=www&catalog_id=1
```

## 文章详情

```
http://api.liuxue.com/article/view?id=32
```

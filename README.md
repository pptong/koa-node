###  KOA 后端分层开发架构实践

* * *
#### 描述
用 `TypeScript` 做的后端，目前只是构建了基础模块，采用了分层的方式进行开发，方便未来面对项目或者是较大型项目的时候直接拿来使用


#### 主要依赖
本次后端的基础框架使用的是 [KOA](https://www.npmjs.com/package/koa) , 除此之外还用到了其他依赖

| 依赖 |说明  |
| --- | --- |
| [jwt](https://www.npmjs.com/package/jwt) | 用于用户身份认证 |
| [Sequelize](https://www.npmjs.com/package/sequelize) | 用于整体ORM框架 |
| [Log4js](https://www.npmjs.com/package/log4js) | 用于日志记录 |
| [routing-controllers](https://www.npmjs.com/package/routing-controllers) | 路由注解方式代替原本(Koa-Router)的做法  |
| [class-transformer](https://www.npmjs.com/package/class-transformer) | 主要实现数据模型(Model)与业务模型(DTO)的转换 |
|[cls-hooked](https://www.npmjs.com/package/cls-hooked) | 为了可以通过命名空间传递信息，淡化Koa洋葱框架的传值过程，将项目代码的经理放到业务逻辑中 |


#### 项目启动

安装依赖
`npm install`

设置你的数据库
`
const development: dbConfig = {
    host: '1.117.240.203',
    database: 'tjc',
    username: 'tjc',
    password: 'FjyL6jTkD6iTr6zH',
    dialect: 'mysql'
}
`
启动项目
`npm run dev`


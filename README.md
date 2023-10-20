##  KOA 后端分层开发架构实践

* * *
### 描述
用 `TypeScript` 做的后端，目前只是构建了基础模块，采用了分层的方式进行开发，方便未来面对项目或者是较大型项目的时候直接拿来使用


### 主要依赖
后端的基础框架使用的是 `koa` , 除此之外还用到了其他依赖

| 依赖 |说明  |
| --- | --- |
| `jwt` | 用于用户身份认证 |
| `Sequelize` | 用于整体ORM框架 |
| `Log4js` | 用于日志记录 |
| `routing-controllers` | 路由注解方式代替原本(Koa-Router)的做法  |
| `class-transformer` | 主要实现数据模型(Model)与业务模型(DTO)的转换 |
| `cls-hooked` | 为了可以通过命名空间传递信息，淡化Koa洋葱框架的传值过程，将项目代码的经理放到业务逻辑中 |

- `koa` https://www.npmjs.com/package/koa
- `jwt` https://www.npmjs.com/package/jwt
- `Sequelize` https://www.npmjs.com/package/sequelize
- `Log4js` https://www.npmjs.com/package/log4js
- `routing-controllers` https://www.npmjs.com/package/routing-controllers
- `class-transformer` https://www.npmjs.com/package/class-transformer
- `cls-hooked` https://www.npmjs.com/package/cls-hooked

###前端项目
对应的前端项目请请进入
https://github.com/pptong/koa-node-front-end

### 项目启动

安装项目所需要的依赖

```shell
npm install
```


在 `./src/config/dbConfig.ts` 中设置你的数据库配置文件中，将数据库设置为你开发数据库
```shell
const development: dbConfig = {
    host: '127.0.0.1',
    database: 'pptong',
    username: 'pptong',
    password: '123456',
    dialect: 'mysql'
}
```

启动开发模式
```shell
npm run dev
```
import Koa from 'koa'
import runConfig from './config/index'
import { useKoaServer  } from 'routing-controllers';
import controllers from './controller/index';
import 'reflect-metadata'

const app = new Koa()

// app.use((ctx)=>{
//     ctx.body = 'Hello World';
// });

useKoaServer (app, {
    controllers: controllers, // 配置(控制器，校验器等)
  });



app.listen(runConfig.port,()=>{
    console.log(`http://${runConfig.host}:${runConfig.port} 已启动`)
})

module.exports = app
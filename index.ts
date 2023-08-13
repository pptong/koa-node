import Koa from 'koa'
import {RunConfig,JwtConfig} from './config/index'
import { useKoaServer,Action } from 'routing-controllers';
import controllers from './controller/index';
import jwt from 'koa-jwt';
import 'reflect-metadata'

const app = new Koa()

// app.use((ctx)=>{
//     ctx.body = 'Hello World';
// });


const jwtSecret = JwtConfig.jwtSecret

app.use(
  jwt({secret:  Buffer.from(JwtConfig.jwtSecret) ,
    debug: true
  }).unless({ path: JwtConfig.jwtWhileList }) // 以 public 开头的请求地址不使用 jwt 中间件
);


useKoaServer(app, {
  controllers: controllers, 
  authorizationChecker: async (action: Action, roles?: string[]) => {
    // perform queries based on token from request headers
    // const token = action.request.headers["authorization"];
    // return database.findUserByToken(token).roles.in(roles);
    return true;
  },

});



app.listen(RunConfig.port, () => {
  console.log(`http://${RunConfig.host}:${RunConfig.port} 已启动`)
})

module.exports = app
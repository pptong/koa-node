import Koa from 'koa'
import {RunConfig,JwtConfig} from './config/index'
import { useKoaServer,Action } from 'routing-controllers';
import controllers from './controller/index';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import { Handler } from './middlewares';


const app = new Koa()




//header.Authorization: Bearer <token>
app.use(
  jwt({secret:  Buffer.from(JwtConfig.jwtSecret) ,
    debug: true
  }).unless({ path: JwtConfig.jwtWhileList }) 
);


useKoaServer(app, {
  //cors: true,
  controllers: controllers, 
  middlewares: Handler,
  defaultErrorHandler: false,
  authorizationChecker: async (action: Action, roles?: string[]) => {
    // perform queries based on token from request headers
    // const token = action.request.headers["authorization"];
    // return database.findUserByToken(token).roles.in(roles);

    //there is not authorizationChecker in here , will be rewritten later
    //by pptong
    return true;
  },

});



app.listen(RunConfig.port, () => {
  console.log(`http://${RunConfig.host}:${RunConfig.port} 已启动`)
})

module.exports = app
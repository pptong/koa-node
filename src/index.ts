import Koa from 'koa'
import { RunConfig, JwtConfig } from './config/index'
import { useKoaServer, Action } from 'routing-controllers';
import controllers from './controller/index';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import { Handler } from './middlewares';
import sequelize from './sequlize/sequlize';




(async () => {
  const app = new Koa()

  //open table sync in development
  //This is an unsafe in a production environment
  if (process.env.NODE_ENV === 'development') {
    await sequelize.sync({ alter: false })
  }


  //token form request.header.Authorization
  //the format is Bearer <token>
  app.use(
    jwt({
      secret: Buffer.from(JwtConfig.jwtSecret),
      debug: true
    }).unless({ path: JwtConfig.jwtWhileList })
  );


  // routing-controllers
  // docs  https://github.com/typestack/routing-controllers
  useKoaServer(app, {
    //cors: true,
    routePrefix: '/api',
    controllers: controllers,
    middlewares: Handler,
    defaultErrorHandler: false,
    authorizationChecker: async (action: Action, roles?: string[]) => {
      return true;
    },

  });



  app.listen(RunConfig.port, () => {
    console.log(`http://${RunConfig.host}:${RunConfig.port} is started`)
  })
})();





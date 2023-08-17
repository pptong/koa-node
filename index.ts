import Koa from 'koa'
import { RunConfig, JwtConfig } from './config/index'
import { useKoaServer, Action } from 'routing-controllers';
import controllers from './controller/index';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import { Handler } from './middlewares';
import sequelize from './sequlize/sequlize';
import { Sequelize } from 'sequelize-typescript';




(async () => {
  const app = new Koa()
  await sequelize.sync({ alter: true })

  //header.Authorization: Bearer <token>
  app.use(
    jwt({
      secret: Buffer.from(JwtConfig.jwtSecret),
      debug: true
    }).unless({ path: JwtConfig.jwtWhileList })
  );


  useKoaServer(app, {
    //cors: true,
    controllers: controllers,
    middlewares: Handler,
    defaultErrorHandler: false ,
    authorizationChecker: async (action: Action, roles?: string[]) => {
      return true;
    },

  });



  app.listen(RunConfig.port, () => {
    console.log(`http://${RunConfig.host}:${RunConfig.port} is started`)
  })



})();





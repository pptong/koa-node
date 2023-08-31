import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { ErrorCode } from "../error/errorCode";
import { ResponseReturn } from "./public/responseReturn";
import * as log4js from "log4js";
import { LoggerConfig } from "../config/loggerConfig";

@Middleware({ type: "before" })
export default class ErrorHandler implements KoaMiddlewareInterface {
  use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    const logger = log4js.getLogger("error");
    return next().catch((err) => {
      logger.info(err);
      console.log(err.message)
      var errorClass = ErrorCode[err.message.trim()];
      if (errorClass) {
        const reponse: ResponseReturn = {
          code: err.message || -1,
          data: null,
          message: ErrorCode[err.message.trim()].msg,
        };
        context.body = reponse;
        context.status = 200;
      } 
    });
  }
}

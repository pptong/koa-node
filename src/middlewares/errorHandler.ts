
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import { ErrorCode } from '../error/errorCode';
import { ResponseReturn } from './public/responseReturn';
import * as log4js from "log4js";
import { LoggerConfig } from "../config/loggerConfig";


@Middleware({ type: 'before' })
export default class ErrorHandler implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        const logger = log4js.getLogger('error');
        return next().catch((err) => {
            logger.info(err)
            if (err.status === 401) {
                context.status = 401
                context.body = 'Protected resource, use Authorization header to get access\n'
            } else {
                const reponse: ResponseReturn = {
                    code: err.message || -1,
                    data: null,
                    msg: ErrorCode[err.message.trim()].msg,
                };
                context.body = reponse;
                context.status = 200
            }
        })
    }
}



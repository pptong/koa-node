import * as log4js from "log4js";
import { LoggerConfig } from "../config/loggerConfig";
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';



@Middleware({ type: 'before' })
export default class LoggerHandler implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        let middleReturn: any;
        log4js.configure(LoggerConfig);
        const logger = log4js.getLogger('request');
        const start = new Date()
        const startTime = +start;
        const remoteAddress = context.headers['x-forwarded-for'] || context.ip || context.ips
        middleReturn = next().then(() => {
            const end = new Date()
            const endTime = +end;
            const ms = endTime - startTime;
            const logText = `${context.method} ${context.status} ${context.url}
                [request body] ${JSON.stringify(context.request.body)} 
                [response body] ${JSON.stringify(context.body)} 
                [request ip] ${remoteAddress} 
                [performance] ${start}-${end}  ${ms}ms`
            logger.info(logText)
        })
        return middleReturn;
    }
}

import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import { ResponseReturn } from './public/responseReturn';

@Middleware({ type: 'after' })
export default class ResponseHandler implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        //console.log(2);
        //let middleReturn: any;
        if (!context.result) {
            const reponse: ResponseReturn = {
                code: 200,
                data: context.body,
                msg: context.msg || 'Success',
            };
            context.type = 'json'
            context.body = reponse;  
        }
        return next();
    }
}

import { Middleware,KoaMiddlewareInterface } from 'routing-controllers';
import { ResponseReturn } from './public/responseReturn';

@Middleware({ type: 'after' })
export default class ResponseHandler implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        if (!context.result) {
            const reponse: ResponseReturn = {
                code: 200,
                data: context.body,
                msg: context.msg || 'Success',
            };
            context.type = 'json'
            console.log(reponse);
            context.body = reponse;
            next()
        }
        return Promise.resolve()
    }
  }
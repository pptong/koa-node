
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import { Sequelize } from 'sequelize-typescript';

@Middleware({ type: 'before' })
export default class TransactionHandler implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
       // throw new Error('ErrorCode.AuthFailed.code')
        const cls = require('cls-hooked');
        const namespace =  cls.createNamespace('sequelize_transaction');
        Sequelize.useCLS(namespace);
        return next()
    }
}
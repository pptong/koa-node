
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import { Sequelize } from 'sequelize-typescript';
import Jwt from 'jsonwebtoken';
import { JwtConfig } from '../config';

@Middleware({ type: 'before' })
export default class SessionHandler implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        const createNamespace = require('cls-hooked').createNamespace;
        const session = createNamespace('my_session');
        let middleReturn: any;
        session.run(() => {
            if (context.header.authorization) {
                const authorization = context.header.authorization.replace("Bearer ", "");
                const decoded: any = Jwt.verify(authorization, Buffer.from(JwtConfig.jwtSecret));
                const currentUser = {
                    id: decoded.user.id,
                    username: decoded.user.username,
                    firstName: decoded.user.firstName,
                    lastName: decoded.user.lastName
                }
                session.set('current_user', JSON.stringify(decoded))
            }
            middleReturn = next()
        });
        return middleReturn;

    }


}
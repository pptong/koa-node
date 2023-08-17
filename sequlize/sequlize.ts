import { Sequelize } from 'sequelize-typescript'
import { DBConfig } from '../config/dbConfig'
import { Models } from '../models';



const sequelize = new Sequelize({
  database: DBConfig.database,
  dialect: 'mysql',
  username: DBConfig.username,
  password: DBConfig.password,
  host:DBConfig.host,
  models: Models, 
});

console.log(sequelize.config)


export default sequelize;
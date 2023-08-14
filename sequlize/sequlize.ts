import { Sequelize } from "sequelize";
import {DBConfig} from '../config/dbConfig'
const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
    host: DBConfig.host,
    dialect: 'mysql',
  });

  export default sequelize;
type dbConfig = {
    database: string;
    username: string;
    password: string;
    host: string;
    dialect: string;
}

// dev config
const development: dbConfig = {
    host: '127.0.0.1',
    database: 'pptong',
    username: 'pptong',
    password: 'pptong',
    dialect: 'mysql'

}

// config from pm2 config.js
const production: dbConfig = {
    host: process.env.DB_HOST || development.database,
    database: process.env.DB_Name || development.database,
    dialect: development.dialect,
    username: process.env.DB_USERNAME || development.username,
    password: process.env.DB_PASSWORD || development.password,

}


export const DBConfig = {
    development: development,
    production: production,
}[process.env.NODE_ENV === 'development' ? 'development' : 'production'] || development;

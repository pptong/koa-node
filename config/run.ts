type RunConfig = {
    host: String;
    port: Number;
    jwtSecret: String;
}

// dev config
const development: RunConfig = {
    host: 'localhost',
    port: 3000,
    jwtSecret: 'koa-node-pptong-dev'
}

// config from pm2 config.js
const production: RunConfig = {
    host: process.env.HOST || development.host,
    port: Number(process.env.PORT) || development.port,
    jwtSecret: process.env.JWTSECRET || development.jwtSecret
}



export const runConfig = {
    development: development,
    production: production,
}[process.env.NODE_ENV === 'development' ? 'development' : 'production'] || development;

type RunConfig = {
    host:String;
    port: Number;
}

// dev config
const development: RunConfig = {
    host: 'localhost',
    port: 3000,
}

// config from pm2 config.js
const production: RunConfig = {
    host: process.env.HOST || development.host,
    port: Number(process.env.PORT) || development.port
}



export const runConfig =  {
    development: development,
    production: production,
}[process.env.NODE_ENV ==='development'?'development':'production'] || development;
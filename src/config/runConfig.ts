type RunConfig = {
    host: String;
    port: Number;
}

// dev config
const development: RunConfig = {
    host: 'localhost',
    port: 8888,
}

// config from pm2 config.js
const production: RunConfig = {
    host: process.env.HOST || development.host,
    port: Number(process.env.PORT) || development.port,
}



export const RunConfig = {
    development: development,
    production: production,
}[process.env.NODE_ENV === 'development' ? 'development' : 'production'] || development;

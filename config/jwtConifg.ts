type JwtConfig = {
    jwtSecret: String;
    jwtWhileList: Array<RegExp>;
}

// dev config
const development: JwtConfig = {
    jwtSecret: 'koa-node-pptong-dev',
    jwtWhileList: [/^\/public/],
}

// config from pm2 config.js
const production: JwtConfig = {
    jwtSecret: process.env.JWTSECRET || development.jwtSecret,
    jwtWhileList: development.jwtWhileList,
}


export const JwtConfig = {
    development: development,
    production: production,
}[process.env.NODE_ENV === 'development' ? 'development' : 'production'] || development;

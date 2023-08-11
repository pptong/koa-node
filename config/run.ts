type RunConfig = {
    url:String;
    port: Number;
}

const development: RunConfig = {
    url: 'localhost',
    port: 3000,
}


const production: RunConfig = {
    url: 'localhost',
    port: 80,
}



export const runConfig =  {
    development: development,
    production: production,
}[process.env.NODE_ENV || 'development'] || development;
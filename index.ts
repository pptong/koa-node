import Koa from 'koa'
import runConfig from './config/index'
const app = new Koa();

app.use((ctx)=>{
    ctx.body = 'Hello World';
});

app.listen(3000,()=>{
    console.log(`http://${runConfig.url}:${runConfig.port} 已启动`)
})
// 引入koa-socket
const IO = require("koa-socket");

const io = new IO()

var roomId = ''
var roomInfo = {}

// socket 中间件
io.use(async (ctx, next) => {
  let start = new Date();
  await next();
  console.log(`response time : ${new Date() - start} ms`);
});

io.on("connection", ctx => {
  console.log(ctx.socket)

});



// 监听加入信息
module.exports = io

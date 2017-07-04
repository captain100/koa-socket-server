const Router = require('koa-router')

const socketRouter = new Router();

var tpResult = {
  a: 0,
  b: 0
};

socketRouter.get("/", async (ctx, next) => {
  console.log(111111111);
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.io.broadcast(JSON.stringify(tpResult));

  ctx.io.on("message", message => {
    message = JSON.parse(message);
    const { type, data } = message;
    if (type == "add") {
      console.log("send !!!!");
      ctx.io.broadcast(JSON.stringify(Object.assign(tpResult, data)));
    }
  });
});

module.exports = socketRouter;

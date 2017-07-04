const Router = require("koa-router");

const socketRouter = new Router();

var tpResult = {
  a: 0,
  b: 0
};

socketRouter.get("/", async (ctx, next) => {
  const wss = ctx.server;
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.send(JSON.stringify(tpResult));

  ctx.websocket.on("message", message => {
    message = JSON.parse(message);
    const { type, data } = message;
    if (type == "add") {
      console.log("send !!!!");
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(Object.assign(tpResult, data)));
        }
      });
    }
  });
});

module.exports = socketRouter;

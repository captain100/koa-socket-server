const Koa = require("koa");
const view = require("koa-view");
const serve = require("koa-static");
const Router = require("koa-router");
const route = require("koa-route");
const websockify = require("koa-websocket");
const path = require("path");

const app = websockify(new Koa());

const router = new Router();

const socketRouter = require("./socket/webSocketRouter");

// 房间用户名单
var roomInfo = {};

router
  .get("/", async (ctx, next) => {
    return ctx.render("index");
  })
  .get("/test/:id", async (ctx, next) => {
    await ctx.render("test");
  })
  .get("/room/:roomID", async (ctx, next) => {
    const { roomID } = ctx.params;
    await ctx.render("room", {
      roomID,
      users: roomInfo[roomID]
    });
  });

// koa 中间件
app
  // 加载静态文件
  .use(serve(path.join(__dirname, "public")))
  // 渲染模版
  .use(view(path.join(__dirname, "views")))
  // koa 路由文件
  .use(router.routes());

app.ws.use(async (ctx, next) => {
  ctx.server = app.ws.server
  await next(ctx)
})

app.ws.use(socketRouter.routes()).use(socketRouter.allowedMethods());

app.listen(process.env.PORT || 9000, () => {
  console.log("server is start");
});

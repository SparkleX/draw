const Koa = require("koa");
const koaLogger = require("koa-logger");
const koaStatic = require("koa-static");

function main() {

	const app = new Koa();
	app.use(koaLogger());
	app.use(koaStatic("public"));

	const port = process.env.PORT || 3000;
	app.listen(port);
	console.info(`Server start on port ${port} `);
}
main();
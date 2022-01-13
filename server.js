const fs = require("fs");
const Koa = require("koa");

class Logger {
    #events = {};

    constructor(log, logfile = null) {
        this._log = log;
        this._logfile = logfile;
        if (this._log && this._logfile) {
            this._stream = fs.createWriteStream(this._logfile, { flags: "a" });
            this._stream.write(`\n========\n`);
            this.closed = false;
        }
    }

    log(type = "INFO", message) {
        if (typeof this.#events[type] === "function") this.#events[type](message);
        if (this._stream && !this.closed) this._stream.write(`${new Date().toISOString()} [${type}] ${message}\n`);
        return this;
    }

    info(message) {
        return this.log("INFO", message);
    }

    success(message) {
        return this.log("SUCCESS", message);
    }

    error(message) {
        return this.log("ERROR", message);
    }

    warn(message) {
        return this.log("WARN", message);
    }

    debug(message) {
        return this.log("DEBUG", message);
    }

    close() {
        if (this._stream && !this.closed) {
            this._stream.end();
            this.closed = true;
        }
        return this;
    }

    on(event, callback) {
        this.#events[event] = callback;
        return this;
    }
}

function createServer({ port, folder, log, logfile }, on = {}) {
    const logger = new Logger(log, logfile);
    for (const event in on) logger.on(event.toUpperCase(), on[event]);

    if (!check({ port, folder, log, logfile })) {
        logger.error("Invalid server configuration");
        return null;
    }

    try {
        const app = new Koa();
        app.use(async (ctx, next) => {
            logger.info(`Process ${ctx.request.method} ${ctx.request.url} from ${ctx.request.ip}`);
            await next();
        });
        app.use(require("koa-static")(folder));
        const server = app.listen(port);

        logger.success(`Server started at port ${port}`);
        logger.success(`Serving static files from ${folder}`);
        logger.success(`Visit http://localhost:${port}/ to see your website.`);
        if (log) logger.info(`Log file: ${logfile}`);

        return async () => {
            server.close();
            logger.info(`Server closed.`);
            logger.close();
        };
    } catch (error) {
        logger.error(error);
        logger.close();
        console.error(error);
        return null;
    }
}

function check({ port, folder, log, logfile }) {
    if (typeof port !== "number") return false;
    if (typeof folder !== "string") return false;
    if (typeof log !== "boolean") return false;
    if (log && typeof logfile !== "string") return false;
    return true;
}

module.exports = createServer;

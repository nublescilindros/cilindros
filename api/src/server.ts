import config from "./utils/config";
import createLogger from "./utils/logger";
import app from "./app";

const { env, apiPort } = config;

app.listen(6067);
createLogger.info(`API running on 6067`);
createLogger.info(`API listening port 6067`);

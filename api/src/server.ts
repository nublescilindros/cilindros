import config from "./utils/config";
import app from "./app";

const { apiPort } = config;

app.listen(3000,"0.0.0.0");
console.log('port '+apiPort+" ....")
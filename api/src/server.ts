import config from "./utils/config";
import app from "./app";

const { apiPort } = config;

app.listen(apiPort);
console.log('port '+apiPort+" ....")


/* app.listen(3000, "0.0.0.0", function () {
    
});  */





import config from "./utils/config";
import app from "./app";

const { apiPort } = config;

/* app.listen(3000); */


app.listen(3000, "0.0.0.0", function () {
    console.log('port ' + apiPort + " ....")
});


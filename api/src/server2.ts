import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("<h2>railwaysssss</h2>")
})


app.listen(6760,"0.0.0.0", () => {
    console.log("p....")
});


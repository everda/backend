import express from "express";
import { ArgumentOutOfRangeError } from "rxjs";

const app = express();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


/*End Point*/
app.get("/", (req, res) => {
    res.send("Hello World!");
    
});
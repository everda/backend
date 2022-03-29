import express from "express";
import __dirname from "./utils.js";
import userRoute from "./Routes/Users.js";
import petRoute from "./Routes/Pets.js";



const app = express();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Listening service correcto on port ${port}`);
});



app.use(express.json());


app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("hola desde el Middleware " + req.method + " - " + req.url);


    next();
});



    app.use('/users', userRoute);
    app.use('/pets', petRoute);






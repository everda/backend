let express = require("express");
const app = express();
let PORT = 8080;
//let cluster = require("cluster");
//let cpus = require("os").cpus().length;
const env = process.argv;

console.log(env);
console.log("registre");
let is_num = num => !isNaN(num);
if(env.length > 0){
    if(is_num(env[0])) PORT = Number(env[0]);
}

app.get("/", (req,res,next)=>{res.send(`Server On http://localhost:${PORT}  ||  Worker: ${process.pid} || FyH: ${new Date()}`)})
app.listen(PORT, ()=>{console.log(`Server On http://localhost:${PORT}  ||  Worker: ${process.pid} || FyH: ${new Date()}`)});

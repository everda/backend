import express from "express";
import { upload } from "../utils.js";

const Router = express.Router();

let users = [];

Router.get("/", (req, res) => {
    res.send(users);
}
);

Router.post("/",upload.single('file'),  (req, res) => {
    console.log(req.file)
    let user = req.body;
    users.push(user);
    res.send(user);
}
);

Router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let user = users.find(user => user.id === id);
    if (user) {
        res.send(user);
    }
    else {
        res.status(400).send({ error: "User not found" });
    }
}
);

Router.put("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let user = users.find(user => user.id === id);
    if (user) {
        let { name, email } = req.body;
        user.name = name;
        user.email = email;
        res.send(user);
    }
    else {
        res.status(400).send({ error: "User not found" });
    }
}
);

Router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let user = users.find(user => user.id === id);
    if (user) {
        users = users.filter(user => user.id !== id);
        res.send(user);
    }
    else {
        res.status(400).send({ error: "User not found" });
    }
}
);




export default Router;
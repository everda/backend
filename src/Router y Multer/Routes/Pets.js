import express from "express";

let pets = [];

const Router = express.Router();

Router.get('/', (req, res) => {
    res.send(pets);
});

Router.post('/', (req, res) => {
    let pet = req.body;
    pets.push(pet);
    res.send(pet);
});

Router.put('/:id', (req, res) => { 
    let id = parseInt(req.params.id);
    let pet = pets.find(pet => pet.id === id);
    if (pet) {
        let { name, age, type, description } = req.body;
        pet.name = name;
        pet.age = age;
        pet.type = type;
        pet.description = description;
        res.send(pet);
    }
    else {
        res.status(400).send({ error: "Pet not found" });
    }
});

Router.delete('/:id', (req, res) => {  
    let id = parseInt(req.params.id);
    let pet = pets.find(pet => pet.id === id);
    if (pet) {
        pets = pets.filter(pet => pet.id !== id);
        res.send(pet);
    }
    else {
        res.status(400).send({ error: "Pet not found" });
    }
});

    
    
export default Router;
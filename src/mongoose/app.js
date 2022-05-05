import mongoose from "mongoose";
import product from "./models/productos.js";



const datos = [
    { id: 1, title: "Teclado", code: "T1", price: 1000, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "Teclado de IKEA", timestamp: new Date() },
    { id: 2, title: "Monitor", code: "M1", price: 5000, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "Monitor de IKEA", timestamp: new Date() },
    { id: 3, title: "Placa de video", code: "P1", price: 1800, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "Placa de video de IKEA", timestamp: new Date() },
    { id: 4, title: "CPU", code: "C1", price: 3500, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "CPU de IKEA", timestamp: new Date() },
    { id: 5, title: "Tower", code: "T1", price: 2000, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "Tower de IKEA", timestamp: new Date() },
    { id: 6, title: "Mouse", code: "M2", price: 500, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "Mouse de IKEA", timestamp: new Date() },
    { id: 7, title: "Notebook", code: "N1", price: 2500, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "Notebook de IKEA", timestamp: new Date() },
    { id: 8, title: "Headset", code: "H1", price: 13000, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "Headset de IKEA", timestamp: new Date() },
    { id: 9, title: "Motherboard", code: "M3", price: 2000, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "Motherboard de IKEA", timestamp: new Date() },
    { id: 10, title: "osito de peluche", code: "O1", price: 100, stock: 10, thumbnail: "https://www.ikea.com/Pics/064/064592_s4.jpg", description: "osito de peluche de IKEA", timestamp: new Date() }
];



(async () => {
    let connectionString = "mongodb://127.0.0.1:27017/";
    let db = "ecommerce"
    console.log(connectionString + db)

    try {
        await mongoose.connect(connectionString + db);
        console.log("Conectado a la base de datos");
        //const response = await product.insertMany(datos);
        const response = await product.find();
        console.log(response);


    } catch (error) {
        console.log(error)
        console.log("Error al conectar a la base de datos");
        console.log("no conectado");
    }


})();

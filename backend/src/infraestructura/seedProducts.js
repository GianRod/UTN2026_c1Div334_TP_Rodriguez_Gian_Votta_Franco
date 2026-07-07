const Producto = require("../models/Producto");

async function seedProductos() {
    const cantidad = await Producto.count();

    if (cantidad > 0) {
        console.log("Los productos ya fueron cargados.");
        return;
    }

    await Producto.bulkCreate([
        {
            nombre: "Pantalon",
            precio: 1,
            stock: 10,
            categoria: "Ropa",
            imagen: "/assets/pantalon.webp",
            activo: true
        },
        {
            nombre: "Collar",
            precio: 2,
            stock: 10,
            categoria: "Accesorio",
            imagen: "/assets/collar.webp",
            activo: true
        },
        {
            nombre: "Cinto",
            precio: 3,
            stock: 10,
            categoria: "Accesorio",
            imagen: "/assets/cinto.webp",
            activo: true
        },
        {
            nombre: "Campera",
            precio: 4,
            stock: 10,
            categoria: "Ropa",
            imagen: "/assets/campera.webp",
            activo: true
        },
        {
            nombre: "Anillo",
            precio: 5,
            stock: 10,
            categoria: "Accesorio",
            imagen: "/assets/anillo.webp",
            activo: true
        },
        {
            nombre: "Jean",
            precio: 6,
            stock: 10,
            categoria: "Ropa",
            imagen: "/assets/jean.webp",
            activo: true
        },
        {
            nombre: "Remera",
            precio: 7,
            stock: 10,
            categoria: "Ropa",
            imagen: "/assets/remera.webp",
            activo: true
        },
        {
            nombre: "Sweater",
            precio: 8,
            stock: 10,
            categoria: "Ropa",
            imagen: "/assets/sweater.webp",
            activo: true
        },
        {
            nombre: "Corbata",
            precio: 9,
            stock: 10,
            categoria: "Accesorio",
            imagen: "/assets/corbata.webp",
            activo: true
        }
    ]);

    console.log("Productos iniciales cargados.");
}

module.exports = seedProductos;
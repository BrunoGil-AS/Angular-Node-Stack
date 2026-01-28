/* global use, db */

// Select db
use("Product-db");

//collMod: Collection Modification
//validator: updates or replace the validator
db.runCommand({
  collMod: "products",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precio", "stock"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Debe ser texto y obligatorio",
        },
        precio: {
          bsonType: "number",
          minimum: 0,
          description: "Debe ser número positivo y obligatorio",
        },
        stock: {
          bsonType: "int",
          minimum: 0,
          description: "Debe ser entero positivo y obligatorio",
        },
        categoria: {
          bsonType: "string",
          description: "Categoría opcional",
        },
      },
    },
  },
  validationLevel: "moderate", // Could be "off", "moderate" o "strict"
  validationAction: "error", // "warn" o "error"
});

// secure insertion
function insertProduct(product) {
  try {
    // Validations of field
    if (!product.nombre || typeof product.nombre !== "string") {
      throw new Error("El nombre es obligatorio y debe ser string");
    }
    if (typeof product.precio !== "number" || product.precio < 0) {
      throw new Error("El precio debe ser número positivo");
    }
    if (!Number.isInteger(product.stock) || product.stock < 0) {
      throw new Error("El stock debe ser entero positivo");
    }

    db.products.insertOne(product);
    print(`Producto '${product.nombre}' insertado correctamente.`);
  } catch (err) {
    print(`Error al insertar producto: ${err.message}`);
  }
}

// Samples
insertProduct({
  nombre: "Laptop Gamer",
  precio: 1500,
  stock: 10,
  categoria: "Electrónica",
});
insertProduct({
  nombre: "Mouse Inalámbrico",
  precio: 25.5,
  stock: 50,
  categoria: "Accesorios",
});
insertProduct({ nombre: "Silla Ergonómica", precio: 200, stock: 5 });

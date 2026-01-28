function existsUser(nombreUsuario, db) {
  try {
    return db.getUser(nombreUsuario) !== null;
  } catch {
    return false;
  }
}

function ensureUser(db, user, pwd, roles) {
  if (!existsUser(user, db)) {
    db.createUser({ user, pwd, roles });
    print(`User '${user}' created.`);
  } else {
    print(`User '${user}' already exists.`);
  }
}

// Select the database to use.
use("Product-db");

// Crear una colección explícitamente
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "must be string and is required",
        },
        precio: {
          bsonType: "number",
          minimum: 0,
          description: "must be positive number and is required",
        },
      },
    },
  },
});
// Usuarios de Product-db
ensureUser(db, "lectorShop", "LectorPass456", [
  { role: "read", db: "Product-db" },
]);
ensureUser(db, "appBackend", "AppSecurePass789", [
  { role: "readWrite", db: "Product-db" },
]);
ensureUser(db, "adminShop", "AdminPass321", [
  { role: "dbOwner", db: "Product-db" },
]);

// Usuario administrador global
use("admin");
ensureUser(db, "adminMongo", "SuperSecurePassword123", [
  { role: "userAdminAnyDatabase", db: "admin" },
  { role: "readWriteAnyDatabase", db: "admin" },
  { role: "dbAdminAnyDatabase", db: "admin" },
]);

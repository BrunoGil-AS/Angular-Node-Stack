# 📘 Guía Completa: MongoDB + Express + TypeScript

## 1. Configuración Inicial del Proyecto {#configuración-inicial}

### Paso 1: Inicializar proyecto TypeScript

```bash
# Crear directorio del proyecto
mkdir mongodb-express-ts
cd mongodb-express-ts

# Inicializar package.json
npm init -y

# Instalar dependencias de producción
npm install express mongoose dotenv cors

# Instalar dependencias de desarrollo
npm install --save-dev typescript @types/express @types/node @types/cors ts-node nodemon

# Inicializar configuración de TypeScript
npx tsc --init
```

### Paso 2: Configurar `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Paso 3: Configurar `package.json` scripts

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon --exec ts-node src/server.ts",
    "watch": "tsc --watch"
  }
}
```

### Paso 4: Estructura de carpetas

```Plain
mongodb-express-ts/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── models/
│   │   └── Producto.ts
│   ├── controllers/
│   │   └── productoController.ts
│   ├── routes/
│   │   └── productos.ts
│   ├── interfaces/
│   │   └── IProducto.ts
│   ├── middlewares/
│   │   └── errorHandler.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 2. Creación de Bases de Datos {#creación-de-bases-de-datos}

### Comandos básicos de MongoDB

```bash
# Conectar a MongoDB shell
mongosh

# Cambiar a una base de datos (se crea automáticamente)
use miTienda

# Verificar la base de datos actual
db

# Insertar un documento para materializar la BD
db.productos.insertOne({
  nombre: "Laptop",
  precio: 1200,
  createdAt: new Date()
})

# Listar todas las bases de datos
show dbs

# Listar colecciones de la BD actual
show collections

# Eliminar una base de datos
db.dropDatabase()
```

### Operaciones básicas de colecciones

```javascript
// Crear una colección explícitamente
db.createCollection("productos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precio"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "debe ser string y es obligatorio",
        },
        precio: {
          bsonType: "number",
          minimum: 0,
          description: "debe ser número positivo y es obligatorio",
        },
      },
    },
  },
});

// Eliminar una colección
db.productos.drop();
```

### ⚡ Verificación de existencia (IF EXISTS)

MongoDB no tiene un comando nativo `IF NOT EXISTS` como SQL, pero puedes verificar antes de crear:

```javascript
// ============================================
// VERIFICAR SI EXISTE UNA BASE DE DATOS
// ============================================
function verificarBaseDatos(nombreDB) {
  const databases = db.adminCommand({ listDatabases: 1 }).databases;
  return databases.some(db => db.name === nombreDB);
}

// Uso
if (!verificarBaseDatos('miTienda')) {
  use miTienda
  db.productos.insertOne({ init: true })
  print("✅ Base de datos 'miTienda' creada")
} else {
  print("⚠️ Base de datos 'miTienda' ya existe")
}

// ============================================
// VERIFICAR SI EXISTE UNA COLECCIÓN
// ============================================
function verificarColeccion(nombreColeccion) {
  const colecciones = db.getCollectionNames();
  return colecciones.includes(nombreColeccion);
}

// Uso
if (!verificarColeccion('productos')) {
  db.createCollection("productos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nombre", "precio"],
        properties: {
          nombre: { bsonType: "string" },
          precio: { bsonType: "number", minimum: 0 }
        }
      }
    }
  })
  print("✅ Colección 'productos' creada")
} else {
  print("⚠️ Colección 'productos' ya existe")
}

// ============================================
// CREAR COLECCIÓN CON VALIDADOR SI NO EXISTE
// ============================================
function crearColeccionSegura(nombre, opciones) {
  if (!verificarColeccion(nombre)) {
    db.createCollection(nombre, opciones);
    print(`✅ Colección '${nombre}' creada`);
  } else {
    print(`⚠️ Colección '${nombre}' ya existe`);
  }
}

// Uso
crearColeccionSegura("productos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precio"],
      properties: {
        nombre: { bsonType: "string" },
        precio: { bsonType: "number", minimum: 0 }
      }
    }
  }
})

// ============================================
// CREAR ÍNDICES SI NO EXISTEN
// ============================================
function crearIndiceSeguro(coleccion, indice, opciones) {
  const indices = db[coleccion].getIndexes();
  const nombreIndice = opciones.name || Object.keys(indice).join('_');

  const existe = indices.some(idx => idx.name === nombreIndice);

  if (!existe) {
    db[coleccion].createIndex(indice, opciones);
    print(`✅ Índice '${nombreIndice}' creado en '${coleccion}'`);
  } else {
    print(`⚠️ Índice '${nombreIndice}' ya existe en '${coleccion}'`);
  }
}

// Uso
crearIndiceSeguro("productos", { nombre: 1 }, { name: "idx_nombre" });
crearIndiceSeguro("productos", { categoria: 1, precio: -1 }, { name: "idx_cat_precio" });
```

---

## 3. Gestión de Usuarios y Permisos {#gestión-de-usuarios}

### 3.1 Crear usuario administrador

```javascript
use admin

db.createUser({
  user: "adminMongo",
  pwd: "SuperSecurePassword123!",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" }
  ]
})
```

### 3.2 Crear usuarios con permisos específicos

```javascript
// Usuario solo lectura
use miTienda

db.createUser({
  user: "lectorTienda",
  pwd: "LectorPass456",
  roles: [
    { role: "read", db: "miTienda" }
  ]
})

// Usuario lectura/escritura
db.createUser({
  user: "appBackend",
  pwd: "AppSecurePass789",
  roles: [
    { role: "readWrite", db: "miTienda" }
  ]
})

// Usuario administrador de BD específica
db.createUser({
  user: "adminTienda",
  pwd: "AdminPass321",
  roles: [
    { role: "dbOwner", db: "miTienda" }
  ]
})
```

### ⚡ Verificar si un usuario existe antes de crearlo

```javascript
// ============================================
// VERIFICAR SI EXISTE UN USUARIO
// ============================================
function verificarUsuario(nombreUsuario, db) {
  try {
    const usuario = db.getUser(nombreUsuario);
    return usuario !== null;
  } catch (error) {
    return false;
  }
}

// ============================================
// CREAR USUARIO SOLO SI NO EXISTE
// ============================================
function crearUsuarioSeguro(username, password, roles) {
  if (!verificarUsuario(username, db)) {
    db.createUser({
      user: username,
      pwd: password,
      roles: roles
    });
    print(`✅ Usuario '${username}' creado exitosamente`);
  } else {
    print(`⚠️ Usuario '${username}' ya existe`);
  }
}

// Uso
use miTienda
crearUsuarioSeguro("appBackend", "AppSecurePass789", [
  { role: "readWrite", db: "miTienda" }
]);

// ============================================
// CREAR O ACTUALIZAR USUARIO
// ============================================
function crearOActualizarUsuario(username, password, roles) {
  if (verificarUsuario(username, db)) {
    // Si existe, actualizar
    db.updateUser(username, {
      pwd: password,
      roles: roles
    });
    print(`🔄 Usuario '${username}' actualizado`);
  } else {
    // Si no existe, crear
    db.createUser({
      user: username,
      pwd: password,
      roles: roles
    });
    print(`✅ Usuario '${username}' creado`);
  }
}

// Uso
use miTienda
crearOActualizarUsuario("appBackend", "NuevaPassword123", [
  { role: "readWrite", db: "miTienda" },
  { role: "read", db: "analytics" }
]);
```

### 3.3 Roles predefinidos y sus equivalentes SQL

| Rol MongoDB            | Permisos                          | Equivalente SQL                         |
| ---------------------- | --------------------------------- | --------------------------------------- |
| `read`                 | Solo consultas                    | `SELECT`                                |
| `readWrite`            | Consultas + escritura             | `SELECT, INSERT, UPDATE, DELETE`        |
| `dbAdmin`              | Gestión de índices y estadísticas | `CREATE INDEX, ANALYZE`                 |
| `userAdmin`            | Gestión de usuarios               | `GRANT, REVOKE`                         |
| `dbOwner`              | Todos los permisos en la BD       | `ALL PRIVILEGES ON database.*`          |
| `readAnyDatabase`      | Lectura en todas las BDs          | `SELECT ON *.*`                         |
| `readWriteAnyDatabase` | Lectura/escritura en todas        | `SELECT, INSERT, UPDATE, DELETE ON *.*` |
| `root`                 | Superusuario (⚠️ peligroso)       | `GRANT ALL PRIVILEGES ON *.*`           |

### 3.4 Gestión avanzada de usuarios

```javascript
// Ver todos los usuarios de la BD actual
db.getUsers();

// Ver información de un usuario específico
db.getUser("appBackend");

// Otorgar roles adicionales
db.grantRolesToUser("appBackend", [{ role: "dbAdmin", db: "miTienda" }]);

// Revocar roles
db.revokeRolesFromUser("appBackend", [{ role: "dbAdmin", db: "miTienda" }]);

// Cambiar contraseña
db.changeUserPassword("appBackend", "NuevaPassword999");

// Eliminar usuario
db.dropUser("lectorTienda");

// Actualizar usuario completo
db.updateUser("appBackend", {
  pwd: "NuevaPassword2024",
  roles: [
    { role: "readWrite", db: "miTienda" },
    { role: "read", db: "analytics" },
  ],
});
```

### 3.5 Roles personalizados

```javascript
use miTienda

// Crear rol personalizado
db.createRole({
  role: "productosManager",
  privileges: [
    {
      resource: { db: "miTienda", collection: "productos" },
      actions: ["find", "insert", "update", "remove"]
    },
    {
      resource: { db: "miTienda", collection: "categorias" },
      actions: ["find"]
    }
  ],
  roles: []
})

// Asignar rol personalizado a usuario
db.createUser({
  user: "managerProductos",
  pwd: "ManagerPass456",
  roles: ["productosManager"]
})
```

### ⚡ Verificar si un rol personalizado existe

```javascript
// ============================================
// VERIFICAR SI EXISTE UN ROL PERSONALIZADO
// ============================================
function verificarRol(nombreRol, db) {
  try {
    const rol = db.getRole(nombreRol);
    return rol !== null;
  } catch (error) {
    return false;
  }
}

// ============================================
// CREAR ROL PERSONALIZADO SI NO EXISTE
// ============================================
function crearRolSeguro(nombreRol, privilegios, rolesHeredados = []) {
  if (!verificarRol(nombreRol, db)) {
    db.createRole({
      role: nombreRol,
      privileges: privilegios,
      roles: rolesHeredados
    });
    print(`✅ Rol '${nombreRol}' creado exitosamente`);
  } else {
    print(`⚠️ Rol '${nombreRol}' ya existe`);
  }
}

// Uso
use miTienda
crearRolSeguro("productosManager", [
  {
    resource: { db: "miTienda", collection: "productos" },
    actions: ["find", "insert", "update", "remove"]
  },
  {
    resource: { db: "miTienda", collection: "categorias" },
    actions: ["find"]
  }
]);

// ============================================
// SCRIPT COMPLETO DE INICIALIZACIÓN
// ============================================
// Este script puedes guardarlo como init-db.js y ejecutarlo con:
// mongosh < init-db.js

use miTienda

// Función auxiliar para verificar usuario
function usuarioExiste(nombreUsuario) {
  try {
    return db.getUser(nombreUsuario) !== null;
  } catch (e) {
    return false;
  }
}

// Función auxiliar para verificar rol
function rolExiste(nombreRol) {
  try {
    return db.getRole(nombreRol) !== null;
  } catch (e) {
    return false;
  }
}

// Función auxiliar para verificar colección
function coleccionExiste(nombreColeccion) {
  return db.getCollectionNames().includes(nombreColeccion);
}

// 1. Crear colecciones si no existen
print("\n📦 Verificando colecciones...");

if (!coleccionExiste("productos")) {
  db.createCollection("productos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nombre", "precio"],
        properties: {
          nombre: { bsonType: "string" },
          precio: { bsonType: "number", minimum: 0 },
          stock: { bsonType: "number", minimum: 0 }
        }
      }
    }
  });
  print("✅ Colección 'productos' creada");
} else {
  print("⚠️ Colección 'productos' ya existe");
}

if (!coleccionExiste("categorias")) {
  db.createCollection("categorias");
  print("✅ Colección 'categorias' creada");
} else {
  print("⚠️ Colección 'categorias' ya existe");
}

// 2. Crear índices si no existen
print("\n🔍 Verificando índices...");

const indicesProductos = db.productos.getIndexes().map(idx => idx.name);

if (!indicesProductos.includes("idx_nombre")) {
  db.productos.createIndex({ nombre: 1 }, { name: "idx_nombre" });
  print("✅ Índice 'idx_nombre' creado");
}

if (!indicesProductos.includes("idx_categoria_precio")) {
  db.productos.createIndex({ categoria: 1, precio: -1 }, { name: "idx_categoria_precio" });
  print("✅ Índice 'idx_categoria_precio' creado");
}

// 3. Crear roles personalizados si no existen
print("\n👥 Verificando roles personalizados...");

if (!rolExiste("productosManager")) {
  db.createRole({
    role: "productosManager",
    privileges: [
      {
        resource: { db: "miTienda", collection: "productos" },
        actions: ["find", "insert", "update", "remove"]
      },
      {
        resource: { db: "miTienda", collection: "categorias" },
        actions: ["find"]
      }
    ],
    roles: []
  });
  print("✅ Rol 'productosManager' creado");
} else {
  print("⚠️ Rol 'productosManager' ya existe");
}

// 4. Crear usuarios si no existen
print("\n🔐 Verificando usuarios...");

if (!usuarioExiste("appBackend")) {
  db.createUser({
    user: "appBackend",
    pwd: "AppSecurePass789",
    roles: [{ role: "readWrite", db: "miTienda" }]
  });
  print("✅ Usuario 'appBackend' creado");
} else {
  print("⚠️ Usuario 'appBackend' ya existe");
}

if (!usuarioExiste("lectorTienda")) {
  db.createUser({
    user: "lectorTienda",
    pwd: "LectorPass456",
    roles: [{ role: "read", db: "miTienda" }]
  });
  print("✅ Usuario 'lectorTienda' creado");
} else {
  print("⚠️ Usuario 'lectorTienda' ya existe");
}

if (!usuarioExiste("managerProductos")) {
  db.createUser({
    user: "managerProductos",
    pwd: "ManagerPass456",
    roles: ["productosManager"]
  });
  print("✅ Usuario 'managerProductos' creado");
} else {
  print("⚠️ Usuario 'managerProductos' ya existe");
}

print("\n✅ Inicialización completada\n");
```

### 3.6 Habilitar autenticación

Editar el archivo de configuración `/etc/mongod.conf`:

```yaml
security:
  authorization: enabled
```

Reiniciar MongoDB:

```bash
sudo systemctl restart mongod
```

Conectar con autenticación:

```bash
# Método 1: Parámetros separados
mongosh -u appBackend -p AppSecurePass789 --authenticationDatabase miTienda

# Método 2: Connection string
mongosh "mongodb://appBackend:AppSecurePass789@localhost:27017/miTienda?authSource=miTienda"
```

---

## 4. Conexión MongoDB con TypeScript {#conexión-mongodb}

### Archivo: `.env`

```env
# MongoDB Configuration
MONGODB_URI=mongodb://appBackend:AppSecurePass789@localhost:27017/miTienda?authSource=miTienda
MONGODB_URI_PROD=mongodb+srv://user:pass@cluster.mongodb.net/miTienda

# Server Configuration
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your_jwt_secret_key_here
```

### Archivo: `src/config/database.ts`

```typescript
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  uri: string;
  options: mongoose.ConnectOptions;
}

const config: DatabaseConfig = {
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/miTienda",
  options: {
    // Las opciones deprecadas ya no son necesarias en Mongoose 6+
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
};

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.uri, config.options);

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);

    // Event listeners
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB desconectado");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Error de MongoDB:", err);
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconectado");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error al conectar MongoDB:", error.message);
    }
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("👋 MongoDB desconectado correctamente");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error al desconectar MongoDB:", error.message);
    }
  }
};

// ============================================
// VERIFICACIÓN DE EXISTENCIA DESDE TYPESCRIPT
// ============================================

/**
 * Verifica si una colección existe en la base de datos
 */
export const verificarColeccion = async (
  nombreColeccion: string,
): Promise<boolean> => {
  try {
    const colecciones = await mongoose.connection.db
      .listCollections({ name: nombreColeccion })
      .toArray();
    return colecciones.length > 0;
  } catch (error) {
    console.error("Error al verificar colección:", error);
    return false;
  }
};

/**
 * Crea una colección solo si no existe
 */
export const crearColeccionSegura = async (
  nombreColeccion: string,
  opciones?: object,
): Promise<boolean> => {
  try {
    const existe = await verificarColeccion(nombreColeccion);

    if (!existe) {
      await mongoose.connection.db.createCollection(nombreColeccion, opciones);
      console.log(`✅ Colección '${nombreColeccion}' creada`);
      return true;
    } else {
      console.log(`⚠️ Colección '${nombreColeccion}' ya existe`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error al crear colección '${nombreColeccion}':`, error);
    return false;
  }
};

/**
 * Verifica si un índice existe en una colección
 */
export const verificarIndice = async (
  nombreColeccion: string,
  nombreIndice: string,
): Promise<boolean> => {
  try {
    const indices = await mongoose.connection.db
      .collection(nombreColeccion)
      .indexes();
    return indices.some((idx: any) => idx.name === nombreIndice);
  } catch (error) {
    console.error("Error al verificar índice:", error);
    return false;
  }
};

/**
 * Crea un índice solo si no existe
 */
export const crearIndiceSeguro = async (
  nombreColeccion: string,
  camposIndice: object,
  opciones?: { name?: string; unique?: boolean; sparse?: boolean },
): Promise<boolean> => {
  try {
    const nombreIndice = opciones?.name || Object.keys(camposIndice).join("_");
    const existe = await verificarIndice(nombreColeccion, nombreIndice);

    if (!existe) {
      await mongoose.connection.db
        .collection(nombreColeccion)
        .createIndex(camposIndice, opciones);
      console.log(`✅ Índice '${nombreIndice}' creado en '${nombreColeccion}'`);
      return true;
    } else {
      console.log(
        `⚠️ Índice '${nombreIndice}' ya existe en '${nombreColeccion}'`,
      );
      return false;
    }
  } catch (error) {
    console.error("❌ Error al crear índice:", error);
    return false;
  }
};

/**
 * Inicializa la base de datos con verificaciones
 */
export const inicializarDB = async (): Promise<void> => {
  try {
    console.log("\n🔧 Inicializando base de datos...\n");

    // Crear colecciones si no existen
    await crearColeccionSegura("productos", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["nombre", "precio"],
          properties: {
            nombre: { bsonType: "string" },
            precio: { bsonType: "number", minimum: 0 },
            stock: { bsonType: "number", minimum: 0 },
          },
        },
      },
    });

    await crearColeccionSegura("categorias");
    await crearColeccionSegura("usuarios");

    // Crear índices si no existen
    await crearIndiceSeguro("productos", { nombre: 1 }, { name: "idx_nombre" });
    await crearIndiceSeguro(
      "productos",
      { categoria: 1, precio: -1 },
      { name: "idx_cat_precio" },
    );
    await crearIndiceSeguro(
      "productos",
      { nombre: "text", descripcion: "text" },
      { name: "idx_text_search" },
    );
    await crearIndiceSeguro(
      "usuarios",
      { email: 1 },
      { name: "idx_email", unique: true },
    );

    console.log("\n✅ Inicialización completada\n");
  } catch (error) {
    console.error("❌ Error en inicialización:", error);
  }
};
```

---

## 5. Implementación CRUD Completo {#crud-completo}

### Archivo: `src/interfaces/IProducto.ts`

```typescript
import { Document } from "mongoose";

export enum CategoriaProducto {
  ELECTRONICA = "Electrónica",
  ROPA = "Ropa",
  ALIMENTOS = "Alimentos",
  HOGAR = "Hogar",
  DEPORTES = "Deportes",
  OTROS = "Otros",
}

export interface IProducto extends Document {
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: CategoriaProducto;
  stock: number;
  activo: boolean;
  imagenes?: string[];
  etiquetas?: string[];
  createdAt: Date;
  updatedAt: Date;

  // Métodos virtuales
  precioConIVA: number;
  estaDisponible: boolean;
}

export interface IProductoInput {
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: CategoriaProducto;
  stock?: number;
  imagenes?: string[];
  etiquetas?: string[];
}

export interface IProductoUpdate {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoria?: CategoriaProducto;
  stock?: number;
  activo?: boolean;
  imagenes?: string[];
  etiquetas?: string[];
}
```

### Archivo: `src/models/Producto.ts`

```typescript
import mongoose, { Schema, Model } from "mongoose";
import { IProducto, CategoriaProducto } from "../interfaces/IProducto";

const productoSchema = new Schema<IProducto>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede exceder 100 caracteres"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede exceder 500 caracteres"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
      validate: {
        validator: function (valor: number) {
          return Number.isFinite(valor) && valor >= 0;
        },
        message: "El precio debe ser un número válido y positivo",
      },
    },
    categoria: {
      type: String,
      enum: {
        values: Object.values(CategoriaProducto),
        message: "{VALUE} no es una categoría válida",
      },
      required: [true, "La categoría es obligatoria"],
      default: CategoriaProducto.OTROS,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
      validate: {
        validator: Number.isInteger,
        message: "El stock debe ser un número entero",
      },
    },
    activo: {
      type: Boolean,
      default: true,
    },
    imagenes: [
      {
        type: String,
        validate: {
          validator: function (url: string) {
            return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
          },
          message: "La URL de la imagen no es válida",
        },
      },
    ],
    etiquetas: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Índices para optimizar búsquedas
productoSchema.index({ nombre: 1 });
productoSchema.index({ categoria: 1 });
productoSchema.index({ precio: 1 });
productoSchema.index({ activo: 1 });
productoSchema.index({ etiquetas: 1 });
productoSchema.index({ nombre: "text", descripcion: "text" });

// Virtual: Precio con IVA (16%)
productoSchema.virtual("precioConIVA").get(function (this: IProducto) {
  return Math.round(this.precio * 1.16 * 100) / 100;
});

// Virtual: Disponibilidad
productoSchema.virtual("estaDisponible").get(function (this: IProducto) {
  return this.activo && this.stock > 0;
});

// Middleware: Antes de guardar
productoSchema.pre("save", function (next) {
  // Capitalizar primera letra del nombre
  if (this.isModified("nombre")) {
    this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
  }
  next();
});

// Middleware: Después de guardar
productoSchema.post("save", function (doc, next) {
  console.log(`✅ Producto guardado: ${doc.nombre} (ID: ${doc._id})`);
  next();
});

// Método estático personalizado
productoSchema.statics.buscarPorCategoria = async function (
  categoria: CategoriaProducto,
): Promise<IProducto[]> {
  return this.find({ categoria, activo: true }).sort({ nombre: 1 });
};

// Método de instancia personalizado
productoSchema.methods.aplicarDescuento = function (
  porcentaje: number,
): number {
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error("El porcentaje debe estar entre 0 y 100");
  }
  return Math.round(this.precio * (1 - porcentaje / 100) * 100) / 100;
};

const Producto: Model<IProducto> = mongoose.model<IProducto>(
  "Producto",
  productoSchema,
);

export default Producto;
```

### Archivo: `src/controllers/productoController.ts`

```typescript
import { Request, Response, NextFunction } from "express";
import Producto from "../models/Producto";
import { IProductoInput, IProductoUpdate } from "../interfaces/IProducto";

// Tipos de respuesta
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

// @desc    Crear un nuevo producto
// @route   POST /api/productos
// @access  Privado
export const crearProducto = async (
  req: Request<{}, {}, IProductoInput>,
  res: Response<ApiResponse<IProducto>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const producto = await Producto.create(req.body);

    res.status(201).json({
      success: true,
      data: producto,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Público
export const obtenerProductos = async (
  req: Request,
  res: Response<ApiResponse<IProducto[]>>,
  next: NextFunction,
): Promise<void> => {
  try {
    // Query parameters para filtrado y paginación
    const {
      categoria,
      activo = "true",
      page = "1",
      limit = "10",
      sort = "-createdAt",
      search,
    } = req.query;

    // Construir filtro
    const filter: any = {};

    if (categoria) {
      filter.categoria = categoria;
    }

    filter.activo = activo === "true";

    // Búsqueda por texto
    if (search && typeof search === "string") {
      filter.$text = { $search: search };
    }

    // Calcular paginación
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Ejecutar query
    const productos = await Producto.find(filter)
      .sort(sort as string)
      .skip(skip)
      .limit(limitNumber)
      .select("-__v");

    const total = await Producto.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: productos.length,
      data: productos,
      message: `Página ${pageNumber} de ${Math.ceil(total / limitNumber)}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/productos/:id
// @access  Público
export const obtenerProducto = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IProducto>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const producto = await Producto.findById(req.params.id).select("-__v");

    if (!producto) {
      res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: producto,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/productos/:id
// @access  Privado
export const actualizarProducto = async (
  req: Request<{ id: string }, {}, IProductoUpdate>,
  res: Response<ApiResponse<IProducto>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!producto) {
      res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: producto,
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Eliminar un producto (soft delete)
// @route   DELETE /api/productos/:id
// @access  Privado
export const eliminarProducto = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IProducto>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true },
    ).select("-__v");

    if (!producto) {
      res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: producto,
      message: "Producto eliminado exitosamente (soft delete)",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Eliminar permanentemente un producto
// @route   DELETE /api/productos/:id/permanent
// @access  Admin
export const eliminarProductoPermanente = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      res.status(404).json({
        success: false,
        error: `Producto con ID ${req.params.id} no encontrado`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Producto eliminado permanentemente",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

// @desc    Buscar productos por categoría
// @route   GET /api/productos/categoria/:categoria
// @access  Público
export const buscarPorCategoria = async (
  req: Request<{ categoria: string }>,
  res: Response<ApiResponse<IProducto[]>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const productos = await Producto.find({
      categoria: req.params.categoria,
      activo: true,
    }).sort({ nombre: 1 });

    res.status(200).json({
      success: true,
      count: productos.length,
      data: productos,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};
```

### Archivo: `src/routes/productos.ts`

```typescript
import { Router } from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
  eliminarProductoPermanente,
  buscarPorCategoria,
} from "../controllers/productoController";

const router = Router();

// Rutas básicas CRUD
router.route("/").get(obtenerProductos).post(crearProducto);

router
  .route("/:id")
  .get(obtenerProducto)
  .put(actualizarProducto)
  .delete(eliminarProducto);

// Rutas adicionales
router.delete("/:id/permanent", eliminarProductoPermanente);
router.get("/categoria/:categoria", buscarPorCategoria);

export default router;
```

### Archivo: `src/middlewares/errorHandler.ts`

```typescript
import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  success: false;
  error: string;
  stack?: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
): void => {
  console.error("❌ Error:", err);

  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(500).json({
    success: false,
    error: err.message || "Error del servidor",
    ...(isDevelopment && { stack: err.stack }),
  });
};

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(404).json({
    success: false,
    error: `Ruta ${req.originalUrl} no encontrada`,
  });
};
```

### Archivo: `src/server.ts`

```typescript
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, inicializarDB } from "./config/database";
import productosRoutes from "./routes/productos";
import { errorHandler, notFound } from "./middlewares/errorHandler";

// Configuración
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Función de inicialización
const iniciarServidor = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Inicializar colecciones e índices (con verificaciones)
    await inicializarDB();

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Log de requests en desarrollo
    if (process.env.NODE_ENV === "development") {
      app.use((req: Request, res: Response, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
      });
    }

    // Rutas
    app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "🚀 API REST con MongoDB, Express y TypeScript",
        version: "1.0.0",
        endpoints: {
          productos: "/api/productos",
          health: "/health",
        },
      });
    });

    app.get("/health", (req: Request, res: Response) => {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    app.use("/api/productos", productosRoutes);

    // Error handlers
    app.use(notFound);
    app.use(errorHandler);

    // Iniciar servidor
    const server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║  🌐 Servidor corriendo en el puerto ${PORT}  ║
║  📊 Entorno: ${process.env.NODE_ENV || "development"}           ║
║  🔗 URL: http://localhost:${PORT}        ║
╚════════════════════════════════════════╝
      `);
    });

    // Manejo de errores no capturados
    process.on("unhandledRejection", (err: Error) => {
      console.error("❌ Unhandled Rejection:", err);
      server.close(() => process.exit(1));
    });

    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM recibido, cerrando servidor...");
      server.close(() => {
        console.log("✅ Servidor cerrado");
      });
    });
  } catch (error) {
    console.error("❌ Error al iniciar servidor:", error);
    process.exit(1);
  }
};

// Iniciar
iniciarServidor();

export default app;
```

---

## 📝 Script de Inicialización Completo

### Archivo: `scripts/init-db.js`

Crea este archivo para ejecutarlo manualmente cuando necesites configurar todo:

```javascript
// scripts/init-db.js
// Ejecutar con: mongosh < scripts/init-db.js

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function usuarioExiste(nombreUsuario) {
  try {
    return db.getUser(nombreUsuario) !== null;
  } catch (e) {
    return false;
  }
}

function rolExiste(nombreRol) {
  try {
    return db.getRole(nombreRol) !== null;
  } catch (e) {
    return false;
  }
}

function coleccionExiste(nombreColeccion) {
  return db.getCollectionNames().includes(nombreColeccion);
}

function indiceExiste(coleccion, nombreIndice) {
  const indices = db[coleccion].getIndexes();
  return indices.some(idx => idx.name === nombreIndice);
}

// ============================================
// CAMBIAR A LA BASE DE DATOS
// ============================================
use miTienda

print("\n" + "=".repeat(50));
print("📦 INICIALIZACIÓN DE BASE DE DATOS: miTienda");
print("=".repeat(50) + "\n");

// ============================================
// 1. CREAR COLECCIONES
// ============================================
print("📦 Verificando colecciones...\n");

if (!coleccionExiste("productos")) {
  db.createCollection("productos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nombre", "precio"],
        properties: {
          nombre: {
            bsonType: "string",
            minLength: 3,
            maxLength: 100,
            description: "Nombre del producto (3-100 caracteres)"
          },
          precio: {
            bsonType: "number",
            minimum: 0,
            description: "Precio del producto (debe ser positivo)"
          },
          stock: {
            bsonType: "number",
            minimum: 0,
            description: "Stock disponible"
          },
          categoria: {
            bsonType: "string",
            enum: ["Electrónica", "Ropa", "Alimentos", "Hogar", "Deportes", "Otros"]
          },
          activo: {
            bsonType: "bool"
          }
        }
      }
    }
  });
  print("  ✅ Colección 'productos' creada con validación");
} else {
  print("  ⚠️  Colección 'productos' ya existe");
}

if (!coleccionExiste("categorias")) {
  db.createCollection("categorias");
  print("  ✅ Colección 'categorias' creada");
} else {
  print("  ⚠️  Colección 'categorias' ya existe");
}

if (!coleccionExiste("usuarios")) {
  db.createCollection("usuarios");
  print("  ✅ Colección 'usuarios' creada");
} else {
  print("  ⚠️  Colección 'usuarios' ya existe");
}

// ============================================
// 2. CREAR ÍNDICES
// ============================================
print("\n🔍 Verificando índices...\n");

// Índices para productos
if (!indiceExiste("productos", "idx_nombre")) {
  db.productos.createIndex({ nombre: 1 }, { name: "idx_nombre" });
  print("  ✅ Índice 'idx_nombre' creado");
} else {
  print("  ⚠️  Índice 'idx_nombre' ya existe");
}

if (!indiceExiste("productos", "idx_cat_precio")) {
  db.productos.createIndex({ categoria: 1, precio: -1 }, { name: "idx_cat_precio" });
  print("  ✅ Índice 'idx_cat_precio' creado");
} else {
  print("  ⚠️  Índice 'idx_cat_precio' ya existe");
}

if (!indiceExiste("productos", "idx_text")) {
  db.productos.createIndex({ nombre: "text", descripcion: "text" }, { name: "idx_text" });
  print("  ✅ Índice de búsqueda de texto creado");
} else {
  print("  ⚠️  Índice de texto ya existe");
}

// Índices para usuarios
if (!indiceExiste("usuarios", "idx_email")) {
  db.usuarios.createIndex({ email: 1 }, { name: "idx_email", unique: true });
  print("  ✅ Índice único 'idx_email' creado");
} else {
  print("  ⚠️  Índice 'idx_email' ya existe");
}

// ============================================
// 3. CREAR ROLES PERSONALIZADOS
// ============================================
print("\n👥 Verificando roles personalizados...\n");

if (!rolExiste("productosManager")) {
  db.createRole({
    role: "productosManager",
    privileges: [
      {
        resource: { db: "miTienda", collection: "productos" },
        actions: ["find", "insert", "update", "remove"]
      },
      {
        resource: { db: "miTienda", collection: "categorias" },
        actions: ["find"]
      }
    ],
    roles: []
  });
  print("  ✅ Rol 'productosManager' creado");
} else {
  print("  ⚠️  Rol 'productosManager' ya existe");
}

if (!rolExiste("analistaVentas")) {
  db.createRole({
    role: "analistaVentas",
    privileges: [
      {
        resource: { db: "miTienda", collection: "" },
        actions: ["find", "listCollections"]
      }
    ],
    roles: []
  });
  print("  ✅ Rol 'analistaVentas' creado");
} else {
  print("  ⚠️  Rol 'analistaVentas' ya existe");
}

// ============================================
// 4. CREAR USUARIOS
// ============================================
print("\n🔐 Verificando usuarios...\n");

if (!usuarioExiste("appBackend")) {
  db.createUser({
    user: "appBackend",
    pwd: "AppSecurePass789",
    roles: [{ role: "readWrite", db: "miTienda" }]
  });
  print("  ✅ Usuario 'appBackend' creado (readWrite)");
} else {
  print("  ⚠️  Usuario 'appBackend' ya existe");
}

if (!usuarioExiste("lectorTienda")) {
  db.createUser({
    user: "lectorTienda",
    pwd: "LectorPass456",
    roles: [{ role: "read", db: "miTienda" }]
  });
  print("  ✅ Usuario 'lectorTienda' creado (read)");
} else {
  print("  ⚠️  Usuario 'lectorTienda' ya existe");
}

if (!usuarioExiste("managerProductos")) {
  db.createUser({
    user: "managerProductos",
    pwd: "ManagerPass456",
    roles: ["productosManager"]
  });
  print("  ✅ Usuario 'managerProductos' creado (rol personalizado)");
} else {
  print("  ⚠️  Usuario 'managerProductos' ya existe");
}

if (!usuarioExiste("analistaData")) {
  db.createUser({
    user: "analistaData",
    pwd: "AnalistaPass789",
    roles: ["analistaVentas"]
  });
  print("  ✅ Usuario 'analistaData' creado (analista)");
} else {
  print("  ⚠️  Usuario 'analistaData' ya existe");
}

// ============================================
// 5. INSERTAR DATOS DE EJEMPLO (OPCIONAL)
// ============================================
print("\n📊 Verificando datos de ejemplo...\n");

const countProductos = db.productos.countDocuments();
if (countProductos === 0) {
  db.productos.insertMany([
    {
      nombre: "Laptop HP Pavilion",
      descripcion: "Laptop 15.6 pulgadas, 16GB RAM, 512GB SSD",
      precio: 15000,
      categoria: "Electrónica",
      stock: 10,
      activo: true,
      etiquetas: ["computadora", "hp", "laptop"]
    },
    {
      nombre: "Mouse Logitech MX Master",
      precio: 1200,
      categoria: "Electrónica",
      stock: 25,
      activo: true
    },
    {
      nombre: "Teclado Mecánico RGB",
      precio: 2500,
      categoria: "Electrónica",
      stock: 15,
      activo: true
    }
  ]);
  print("  ✅ Datos de ejemplo insertados");
} else {
  print(`  ⚠️  Ya existen ${countProductos} productos en la base de datos`);
}

// ============================================
// RESUMEN FINAL
// ============================================
print("\n" + "=".repeat(50));
print("✅ INICIALIZACIÓN COMPLETADA");
print("=".repeat(50));
print("\n📊 Resumen:");
print(`  - Colecciones: ${db.getCollectionNames().length}`);
print(`  - Usuarios: ${db.getUsers().users.length}`);
print(`  - Productos: ${db.productos.countDocuments()}`);
print("\n💡 Conecta con:");
print("  mongosh -u appBackend -p AppSecurePass789 --authenticationDatabase miTienda");
print("\n");
```

**Cómo ejecutar el script:**

```bash
# Opción 1: Desde la terminal
mongosh < scripts/init-db.js

# Opción 2: Dentro de mongosh
mongosh
> load('scripts/init-db.js')

# Opción 3: Con conexión específica
mongosh mongodb://localhost:27017 < scripts/init-db.js
```

---

## 6. Herramientas de Automatización {#automatización}

### 6.1 NestJS - Framework completo (Similar a Spring Boot)

```bash
# Instalar NestJS CLI
npm i -g @nestjs/cli

# Crear nuevo proyecto
nest new mi-proyecto-nest

# Generar recurso CRUD completo
nest g resource productos

# Esto genera automáticamente:
# - Module
# - Controller
# - Service
# - DTOs
# - Entity
# - Tests
```

**Ejemplo de entidad en NestJS:**

```typescript
// productos/entities/producto.entity.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Producto extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, min: 0 })
  precio: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: true })
  activo: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
```

**Service con inyección de dependencias:**

```typescript
// productos/productos.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Producto } from "./entities/producto.entity";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { UpdateProductoDto } from "./dto/update-producto.dto";

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = new this.productoModel(createProductoDto);
    return producto.save();
  }

  async findAll(): Promise<Producto[]> {
    return this.productoModel.find({ activo: true }).exec();
  }

  async findOne(id: string): Promise<Producto> {
    return this.productoModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    return this.productoModel
      .findByIdAndUpdate(id, updateProductoDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Producto> {
    return this.productoModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .exec();
  }
}
```

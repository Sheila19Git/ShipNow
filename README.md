# ShipNow API

## Descripción

Este proyecto consiste en una API desarrollada con Node.js, Express y MongoDB. Durante esta preentrega se reorganizó el proyecto utilizando una arquitectura por capas para separar las responsabilidades del código y hacerlo más claro y fácil de mantener.

## Tecnologías utilizadas

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* Dotenv
* Nodemon

## Cómo ejecutar el proyecto

1. Clonar el repositorio.
2. Instalar las dependencias con:

```bash
npm install
```

3. Crear un archivo `.env` tomando como ejemplo el archivo `.env.example`.

4. Completar las siguientes variables:

```env
PORT=
MONGODB_URI=
NODE_ENV=
```

5. Iniciar el servidor con:

```bash
npm run dev
```

## Organización del proyecto

El proyecto está organizado en diferentes carpetas para que cada una tenga una función específica:

* **Controllers:** reciben las peticiones y envían las respuestas.
* **Services:** contienen la lógica del negocio.
* **Repositories:** realizan las consultas a la base de datos.
* **Models:** definen la estructura de los datos.
* **Routes:** conectan las rutas con los controladores.
* **Config:** contiene la configuración del proyecto.

## ¿Por qué separé Service y Repository?

Decidí separar estas capas para que cada una tenga una única responsabilidad.

El **Repository** se encarga únicamente de acceder a la base de datos, mientras que el **Service** contiene la lógica del proyecto, como las validaciones y el procesamiento de la información antes de devolverla al cliente.

De esta manera el código queda más organizado, es más fácil de entender y resulta más sencillo realizar modificaciones en el futuro.

## Variables de entorno

El proyecto utiliza las siguientes variables de entorno:

* PORT
* MONGODB_URI
* NODE_ENV

Si alguna de estas variables no está definida, la aplicación muestra un error y no inicia.

## Autor

Proyecto realizado por Sheila Magali Chiesa como preentrega del Módulo 1.
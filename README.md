# ShipNow API

## Descripción

Este proyecto consiste en una API desarrollada con Node.js, Express y MongoDB. Durante el desarrollo se reorganizó el proyecto utilizando una arquitectura por capas para separar las responsabilidades del código y hacerlo más claro y fácil de mantener.

Además, se incorporó un sistema de mocking para generar datos de prueba de usuarios, repartidores, pedidos y entregas, permitiendo probar la aplicación sin depender de datos reales cargados manualmente.

## Tecnologías utilizadas

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* Dotenv
* Nodemon
* Faker

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
* **Repositories:** realizan las consultas e inserciones en la base de datos.
* **Models:** definen la estructura de los datos.
* **Routes:** conectan las rutas con los controladores.
* **Config:** contiene la configuración del proyecto.
* **Utils:** contiene funciones auxiliares, como los generadores de datos simulados.

## ¿Por qué separé Service y Repository?

Decidí separar estas capas para que cada una tenga una única responsabilidad.

El **Repository** se encarga únicamente de acceder a la base de datos, mientras que el **Service** contiene la lógica del proyecto, como las validaciones y el procesamiento de la información antes de devolverla al cliente.

De esta manera el código queda más organizado, es más fácil de entender y resulta más sencillo realizar modificaciones en el futuro.

## Módulo 2 - Mocking y carga de datos de prueba

En esta etapa se incorporó un sistema de mocking para generar datos de prueba de usuarios, repartidores, pedidos y entregas.

Los datos pueden generarse de dos formas:

* Generando datos simulados sin guardarlos en la base de datos.
* Insertando datos de prueba en MongoDB manteniendo las relaciones entre las entidades.

El módulo de mocking mantiene la misma arquitectura por capas del proyecto:

* **Routes:** contienen las rutas disponibles para generar mocks.
* **Controllers:** reciben las solicitudes y devuelven las respuestas.
* **Services:** contienen la lógica para generar y relacionar los datos.
* **Repositories:** se encargan de insertar la información en MongoDB.
* **Utils:** contiene los generadores de datos simulados.

## Endpoints de Mocking

### Generar usuarios simulados

Genera usuarios de prueba sin guardarlos en la base de datos.

```
GET /api/mocks/users?qty=3
```

### Generar repartidores simulados

Genera repartidores de prueba.

```
GET /api/mocks/couriers?qty=3
```

### Generar pedidos simulados

Genera pedidos de prueba respetando los estados y prioridades permitidos.

```
GET /api/mocks/orders?qty=3
```

### Generar entregas simuladas

Genera entregas de prueba.

```
GET /api/mocks/deliveries?qty=3
```

### Cargar datos de prueba en MongoDB

Este endpoint permite insertar datos simulados en la base de datos.

```
POST /api/mocks/seed?qty=10
```

La carga genera usuarios, repartidores, pedidos y entregas relacionados entre sí.

Ejemplo de respuesta:

```json
{
    "usuarios": 10,
    "repartidores": 10,
    "pedidos": 10,
    "entregas": 10
}
```

## Variables de entorno

El proyecto utiliza las siguientes variables de entorno:

* PORT
* MONGODB_URI
* NODE_ENV

Si alguna de estas variables no está definida, la aplicación muestra un error y no inicia.

## Autor

Proyecto realizado por Sheila Magali Chiesa como preentrega del Módulo 2.

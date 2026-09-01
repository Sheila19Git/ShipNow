ShipNow API

API REST desarrollada con **Node.js, Express y MongoDB**, construida con arquitectura por capas. El proyecto incorpora mocking de datos, manejo centralizado de errores, logging profesional, documentación interactiva con Swagger/OpenAPI, carga de archivos, testing funcional automatizado y ejecución mediante Docker.

## Tecnologías

- Node.js / Express
- MongoDB Atlas / Mongoose
- Faker — generación de datos simulados
- Multer — carga y gestión de archivos
- Winston / Winston Daily Rotate File — logging
- Swagger UI + JSDoc — documentación interactiva
- Mocha — ejecución de tests
- Chai — aserciones
- Supertest — pruebas HTTP
- Cross-env — configuración del entorno de testing
- Dotenv
- Nodemon
- Docker

## Cómo ejecutar

### 1. Clonar el repositorio

```bash
git clone https://github.com/Sheila19Git/ShipNow.git
cd ShipNow
2. Instalar dependencias
npm install
3. Configurar variables de entorno

Crear un archivo .env basándose en .env.example.

Variables requeridas:

PORT=8080
MONGODB_URI=tu_uri_de_mongodb
NODE_ENV=development
LOG_LEVEL=info

Las variables sensibles, como la URI de MongoDB, no deben escribirse directamente en el código ni subirse al repositorio.

La aplicación valida las variables críticas al iniciar y no arranca si falta alguna de ellas.

Variables críticas:

PORT
MONGODB_URI
NODE_ENV
LOG_LEVEL
4. Iniciar el servidor

Para desarrollo:

npm run dev

Para ejecución normal:

npm start

La API queda disponible en:

http://localhost:8080
Health Check

La API incorpora un endpoint de health check:

GET /health

Disponible en:

http://localhost:8080/health

Ejemplo de respuesta:

{
  "status": "ok",
  "environment": "development",
  "uptime": 123.45,
  "timestamp": "2026-09-01T03:46:26.928Z"
}

El endpoint permite verificar el estado de la API sin exponer información sensible.

Swagger / OpenAPI

La documentación interactiva de la API está disponible en:

http://localhost:8080/api/docs

Con el servidor iniciado, Swagger UI permite consultar y probar los endpoints documentados.

La configuración de Swagger se encuentra separada de la lógica de las rutas en:

src/config/swagger/swagger.js
Módulos documentados
Users
Products
Orders
Deliveries
Mocks
Logger
Schemas reutilizables
User
Product
OrderItem
Order
Delivery
ErrorResponse
SuccessResponse
MockQuantityError
Arquitectura por capas
Capa	Responsabilidad
Routes	Conectan las rutas con los controllers
Controllers	Reciben peticiones y envían respuestas
Services	Contienen la lógica de negocio
Repositories	Gestionan el acceso a MongoDB
Models	Definen la estructura de los datos
Config	Configuración de MongoDB, variables de entorno, Swagger, logger y Multer
Utils	Funciones auxiliares y generadores de mocks
Errors	Errores personalizados y middleware global
Performance

Se aplicaron medidas básicas para evitar respuestas y operaciones innecesariamente grandes.

Usuarios

El listado de usuarios utiliza paginación mediante los parámetros:

page
limit

Ejemplo:

GET /api/users?page=1&limit=10

El repositorio aplica un límite máximo de resultados para evitar solicitudes excesivas.

Productos

El listado de productos utiliza paginación y límite de resultados.

Ejemplo:

GET /api/products?page=1&limit=10
Archivos

La carga de archivos está limitada a un tamaño máximo de 5 MB y restringida a determinados tipos MIME.

Los errores relacionados con archivos son procesados mediante el middleware centralizado.

Módulo 2 — Mocking

Generación de datos simulados con Faker, con opción de persistirlos en MongoDB.

Método	Endpoint	Descripción
GET	/api/mocks/users?qty=3	Genera usuarios mock sin guardar
GET	/api/mocks/couriers?qty=3	Genera repartidores mock sin guardar
GET	/api/mocks/orders?qty=3	Genera pedidos mock sin guardar
GET	/api/mocks/deliveries?qty=3	Genera entregas mock sin guardar
POST	/api/mocks/seed/users?qty=10	Inserta usuarios mock en MongoDB
POST	/api/mocks/seed?qty=10	Inserta datos mock completos en MongoDB

El parámetro qty representa la cantidad de datos a generar o insertar.

Módulo 3 — Manejo de errores

Sistema centralizado con errores personalizados, diccionario de errores y middleware global.

Errores contemplados
USER_NOT_FOUND
ORDER_NOT_FOUND
DELIVERY_NOT_FOUND
INVALID_STATUS
INVALID_MOCK_QUANTITY
INVALID_PRODUCT_DATA
INVALID_USER_DATA
INVALID_DOCUMENT_TYPE
FILE_REQUIRED
FILE_TOO_LARGE
INVALID_FILE_TYPE
INVALID_FILE_FIELD
INTERNAL_SERVER_ERROR
Módulo 4 — Logging

Sistema de logging implementado con Winston.

Niveles disponibles
fatal
error
warning
info
http
debug

Los logs se muestran en consola con fecha, hora y nivel.

Los errores se almacenan en:

logs/error-YYYY-MM-DD.log

La carpeta logs/ se encuentra incluida en .gitignore y .dockerignore.

Endpoint de prueba
GET /api/logger/test

Este endpoint se utiliza como herramienta de validación del sistema de logging y no representa una funcionalidad de negocio.

Módulo 5 — Documentación con Swagger

La documentación interactiva de la API se encuentra disponible en:

http://localhost:8080/api/docs

Swagger está organizado mediante tags para facilitar la navegación:

Users
Orders
Deliveries
Mocks
Logger
Products

La documentación incluye métodos HTTP, rutas, parámetros, cuerpos de solicitud cuando corresponde, respuestas exitosas y respuestas de error.

Módulo 6 — Testing funcional

El proyecto incorpora una suite de tests funcionales automatizados utilizando Mocha, Chai y Supertest.

Los tests se ejecutan sobre un entorno separado del desarrollo mediante:

.env.test

El entorno de testing utiliza una base de datos independiente:

shipnow_test

El archivo .env.test se encuentra incluido en .gitignore y no debe subirse al repositorio.

Ejecutar los tests
npm test

El script configura automáticamente:

NODE_ENV=test

y ejecuta la suite de Mocha.

Resultado actual
32 passing
Cobertura

La suite valida:

Ruta de Swagger
Endpoint de Logger
Usuarios
Pedidos
Entregas
Generación de mocks
Inserción de usuarios mock
Inserción de datos mock completos
Cantidades inválidas de mocks
Datos inválidos de usuarios
Recursos inexistentes
Rutas inexistentes
Carga de documentos de usuarios
Validación de archivo obligatorio
Validación de tipo de documento
Carga de comprobantes de entregas
Validación de comprobante obligatorio
Validación de entregas inexistentes

Los tests verifican tanto el status HTTP como la estructura y propiedades importantes del body.

Módulo 7 — Carga de archivos, documentos y comprobantes

Se implementó un sistema de carga de archivos utilizando Multer.

La funcionalidad permite:

Cargar documentos asociados a usuarios.
Cargar comprobantes asociados a entregas.
Validar el tipo MIME de los archivos.
Limitar el tamaño máximo de los archivos.
Generar nombres únicos para los archivos.
Separar los archivos de usuarios y entregas en directorios diferentes.
Registrar la información del archivo en MongoDB.
Manejar errores mediante el sistema centralizado.
Tipos de archivo permitidos
PDF
JPG / JPEG
PNG
Tamaño máximo
5 MB
Directorio de almacenamiento

Los archivos se almacenan mediante un directorio configurable a través de UPLOAD_DIR.

Si no se especifica, se utiliza un directorio temporal del sistema.

Los archivos generados no deben subirse al repositorio.

Cargar documento de usuario
POST /api/users/{userId}/documents

El request utiliza:

multipart/form-data

Campo del archivo:

document

Campo adicional:

documentType

Ejemplo:

documentType = DNI
Cargar comprobante de entrega
POST /api/deliveries/{deliveryId}/receipt

El request utiliza:

multipart/form-data

Campo del archivo:

receipt
Errores relacionados con archivos

Ejemplo:

{
  "status": "error",
  "code": "FILE_REQUIRED",
  "message": "El archivo es obligatorio"
}

También se controlan:

Archivos demasiado grandes.
Tipos MIME no permitidos.
Campos de archivo no permitidos.
Archivos faltantes.
Módulo 8 — Performance, escalabilidad y Docker

En este módulo se preparó ShipNow para una ejecución más estable y cercana a un entorno de producción.

Se incorporaron:

Control de listados mediante paginación y límites.
Límites de tamaño y tipos de archivo.
Validación de variables de entorno.
Health check.
Criterio de exposición de endpoints internos.
Dockerfile.
.dockerignore.
Ejecución de la API dentro de un contenedor Docker.
Documentación de ejecución y despliegue básico.
Preparación para producción

La aplicación utiliza variables de entorno para separar la configuración del código.

Las variables críticas son validadas durante el inicio:

PORT
MONGODB_URI
NODE_ENV
LOG_LEVEL

Si alguna variable requerida no está definida, la aplicación falla durante el inicio mostrando un mensaje claro.

Los valores sensibles no se encuentran escritos directamente en el código.

Endpoints internos

Los endpoints utilizados exclusivamente para desarrollo y testing tienen el siguiente criterio:

Swagger está disponible en development y test.
Mocks están disponibles en development y test.
Logger de prueba está disponible en development y test.
Estos endpoints internos no se exponen en production.
El endpoint /health permanece disponible para verificar el estado de la API.

Este criterio permite utilizar herramientas de desarrollo y testing sin exponerlas innecesariamente en producción.

Docker

La API puede ejecutarse dentro de un contenedor Docker.

Dockerfile

El proyecto incluye un Dockerfile en la raíz del repositorio.

El Dockerfile:

Utiliza una imagen base de Node.js.
Define /app como directorio de trabajo.
Copia los archivos necesarios del proyecto.
Instala las dependencias.
Copia el código de la aplicación.
Ejecuta la aplicación mediante npm start.
.dockerignore

El proyecto incluye un .dockerignore para evitar copiar archivos innecesarios, temporales o sensibles a la imagen.

Entre los archivos y directorios excluidos se encuentran:

node_modules
.env
.env.*
.git
.gitignore
logs
uploads
coverage
.nyc_output
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.tmp
*.temp
.DS_Store
Construir la imagen

Desde la raíz del proyecto:

docker build -t shipnow .
Ejecutar el contenedor

Las variables de entorno pueden proporcionarse mediante un archivo externo:

docker run -p 8080:8080 --env-file .env -e LOG_LEVEL=info --name shipnow-container shipnow

La API queda disponible en:

http://localhost:8080
Probar la aplicación dentro del contenedor
API
http://localhost:8080

Respuesta:

ShipNow API funcionando
Health Check
http://localhost:8080/health
Swagger
http://localhost:8080/api/docs
Endpoint principal
http://localhost:8080/api/users

El contenedor fue probado correctamente verificando:

Inicio de la aplicación.
Conexión a MongoDB.
Servidor escuchando en el puerto 8080.
Health check.
Swagger.
Endpoint principal.
Archivos que no deben subirse al repositorio

Los siguientes archivos y directorios contienen información sensible, generada o temporal:

.env
.env.*
node_modules/
.git/
logs/
uploads/
coverage/
.nyc_output/
*.tmp
*.temp

Los archivos .env pueden contener credenciales o información específica del entorno y deben mantenerse fuera del repositorio.

Logs y uploads
Logs

Los logs se generan mediante Winston.

Los errores se almacenan mediante rotación diaria:

logs/error-YYYY-MM-DD.log

La carpeta logs/ no se incluye en el repositorio ni en la imagen Docker.

Uploads

Los archivos cargados mediante Multer se almacenan fuera del repositorio.

El directorio puede configurarse mediante:

UPLOAD_DIR=/ruta/del/directorio

Los uploads generados no se incluyen en la imagen Docker.

Resultados de testing

La suite funcional completa se ejecuta correctamente:

32 passing

La aplicación también fue ejecutada mediante Docker verificando correctamente:

Conexión a MongoDB establecida
Servidor ShipNow escuchando en el puerto 8080

El health check respondió correctamente desde el contenedor.

Pre-entrega Módulo 8

En esta pre-entrega se incorporaron:

Buenas prácticas básicas de performance.
Paginación y límites en listados.
Límites y validación de archivos.
Configuración mediante variables de entorno.
Validación de variables críticas al iniciar.
Health check.
Criterio de exposición de endpoints internos.
Dockerfile.
.dockerignore.
Ejecución de la API mediante Docker.
Documentación de producción y Docker en README.
Autora

Sheila Magali Chiesa

Pre-entrega Módulos 2, 3, 4, 5, 6, 7 y 8.
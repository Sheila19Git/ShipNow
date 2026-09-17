ShipNow API

API REST desarrollada con *Node.js, Express y MongoDB*, construida con arquitectura por capas. El proyecto incorpora mocking de datos, manejo centralizado de errores, logging profesional, documentaciÃ³n interactiva con Swagger/OpenAPI, carga de archivos, testing funcional automatizado y ejecuciÃ³n mediante Docker.

## TecnologÃ­as

\- Node.js / Express

\- MongoDB Atlas / Mongoose

\- Faker â€” generaciÃ³n de datos simulados

\- Multer â€” carga y gestiÃ³n de archivos

\- Winston / Winston Daily Rotate File â€” logging

\- Swagger UI + JSDoc â€” documentaciÃ³n interactiva

\- Mocha â€” ejecuciÃ³n de tests

\- Chai â€” aserciones

\- Supertest â€” pruebas HTTP

\- Cross-env â€” configuraciÃ³n del entorno de testing

\- Dotenv

\- Nodemon

\- Docker

## CÃ³mo ejecutar

### 1. Clonar el repositorio
### CÃ³mo ejecutar

### 1. Clonar el repositorio

```
git clone https://github.com/Sheila19Git/ShipNow.git
cd ShipNow
```

### 2. Instalar dependencias

```
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` basÃ¡ndose en `.env.example`.

Variables requeridas:

```env
PORT=8080
MONGODB_URI=tu_uri_de_mongodb
NODE_ENV=development
LOG_LEVEL=info
```

Las variables sensibles, como la URI de MongoDB, no deben escribirse directamente en el cÃ³digo ni subirse al repositorio.

La aplicaciÃ³n valida las variables crÃ­ticas al iniciar y no arranca si falta alguna de ellas.

Variables crÃ­ticas:

- `PORT`
- `MONGODB_URI`
- `NODE_ENV`
- `LOG_LEVEL`

### 4. Iniciar el servidor
Para desarrollo:

```
npm run dev
```

Para ejecuciÃ³n normal:

```
npm start
```

La API queda disponible en:

http://localhost:8080

### Health Check

La API incorpora un endpoint de health check:

```http
GET /health
```

Disponible en:

http://localhost:8080/health
### Ejemplo de respuesta

```json
{
  "status": "ok",
  "environment": "development",
  "uptime": 123.45,
  "timestamp": "2026-09-01T03:46:26.928Z"
}
```

El endpoint permite verificar el estado de la API sin exponer informaciÃ³n sensible.

## Swagger / OpenAPI

La documentaciÃ³n interactiva de la API estÃ¡ disponible en:

[http://localhost:8080/api/docs](http://localhost:8080/api/docs)

Con el servidor iniciado, Swagger UI permite consultar y probar los endpoints documentados.

La configuraciÃ³n de Swagger se encuentra separada de la lÃ³gica de las rutas en:

```text
src/config/swagger/swagger.js
```

### MÃ³dulos documentados

- Users
- Products
- Orders
- Deliveries
- Mocks
- Logger

### Schemas reutilizables

- User
- Product
- OrderItem
- Order
- Delivery
- ErrorResponse
- SuccessResponse
- MockQuantityError

## Arquitectura por capas

| Capa | Responsabilidad |
|---|---|
| Routes | Conectan las rutas con los controllers |
| Controllers | Reciben peticiones y envÃ­an respuestas |
| Services | Contienen la lÃ³gica de negocio |
| Repositories | Gestionan el acceso a MongoDB |
| Models | Definen la estructura de los datos |
| Config | ConfiguraciÃ³n de MongoDB, variables de entorno, Swagger, logger y Multer |
| Utils | Funciones auxiliares y generadores de mocks |
| Errors | Errores personalizados y middleware global |

## Performance

Se aplicaron medidas para evitar respuestas y operaciones innecesariamente grandes.

### Usuarios

El listado de usuarios utiliza paginaciÃ³n mediante los parÃ¡metros:

- `page`
- `limit`
### Usuarios

El listado de usuarios utiliza paginaciÃ³n mediante los parÃ¡metros:

- `page`
- `limit`

Ejemplo:

```http
GET /api/users?page=1&limit=10
```

El repositorio aplica un lÃ­mite mÃ¡ximo de resultados para evitar solicitudes excesivas.

### Productos

El listado de productos utiliza paginaciÃ³n y lÃ­mite de resultados.

Ejemplo:

```http
GET /api/products?page=1&limit=10
```

### Pedidos

El listado de pedidos utiliza paginaciÃ³n y lÃ­mite de resultados.

Ejemplo:

```http
GET /api/orders?page=1&limit=10
```

El repositorio aplica un lÃ­mite mÃ¡ximo de resultados para evitar solicitudes excesivas.

### Entregas

El listado de entregas utiliza paginaciÃ³n y lÃ­mite de resultados.

Ejemplo:

```http
GET /api/deliveries?page=1&limit=10
```

El repositorio aplica un lÃ­mite mÃ¡ximo de resultados para evitar solicitudes excesivas.

### Archivos

La carga de archivos estÃ¡ limitada a un tamaÃ±o mÃ¡ximo de **5 MB** y restringida a determinados tipos MIME.

Los errores relacionados con archivos son procesados mediante el middleware centralizado.

## MÃ³dulo 2 â€” Mocking

GeneraciÃ³n de datos simulados con Faker, con opciÃ³n de persistirlos en MongoDB.

| MÃ©todo | Endpoint | DescripciÃ³n |
|---|---|---|
| GET | `/api/mocks/users?qty=3` | Genera usuarios mock sin guardar |
| GET | `/api/mocks/couriers?qty=3` | Genera repartidores mock sin guardar |
| GET | `/api/mocks/orders?qty=3` | Genera pedidos mock sin guardar |
| GET | `/api/mocks/deliveries?qty=3` | Genera entregas mock sin guardar |
| POST | `/api/mocks/seed/users?qty=10` | Inserta usuarios mock en MongoDB |
| POST | `/api/mocks/seed?qty=10` | Inserta datos mock completos en MongoDB |

El parÃ¡metro `qty` representa la cantidad de datos a generar o insertar.
## MÃ³dulo 3 â€” Manejo de errores

Sistema centralizado con errores personalizados, diccionario de errores y middleware global.

### Errores contemplados

- `USER_NOT_FOUND`
- `ORDER_NOT_FOUND`
- `DELIVERY_NOT_FOUND`
- `INVALID_STATUS`
- `INVALID_MOCK_QUANTITY`
- `INVALID_PRODUCT_DATA`
- `INVALID_USER_DATA`
- `INVALID_DOCUMENT_TYPE`
- `FILE_REQUIRED`
- `FILE_TOO_LARGE`
- `INVALID_FILE_TYPE`
- `INVALID_FILE_FIELD`
- `INTERNAL_SERVER_ERROR`

## MÃ³dulo 4 â€” Logging

Sistema de logging implementado con Winston.

### Niveles disponibles

- `fatal`
- `error`
- `warning`
- `info`
- `http`
- `debug`

Los logs se muestran en consola con fecha, hora y nivel.

Los errores se almacenan en:

```text
logs/error-YYYY-MM-DD.log
```

La carpeta `logs/` se encuentra incluida en `.gitignore` y `.dockerignore`.

### Endpoint de prueba

```http
GET /api/logger/test
```
Este endpoint se utiliza como herramienta de validaciÃ³n del sistema de logging y no representa una funcionalidad de negocio.

## MÃ³dulo 5 â€” DocumentaciÃ³n con Swagger

La documentaciÃ³n interactiva de la API se encuentra disponible en:

<http://localhost:8080/api/docs>

Swagger estÃ¡ organizado mediante tags para facilitar la navegaciÃ³n:

- `Users`
- `Orders`
- `Deliveries`
- `Mocks`
- `Logger`
- `Products`

La documentaciÃ³n incluye:

- MÃ©todos HTTP.
- Rutas.
- ParÃ¡metros.
- Cuerpos de solicitud cuando corresponde.
- Respuestas exitosas.
- Respuestas de error.

## MÃ³dulo 6 â€” Testing funcional

El proyecto incorpora una suite de tests funcionales automatizados utilizando **Mocha**, **Chai** y **Supertest**.

Los tests se ejecutan sobre un entorno separado del desarrollo mediante:

```text
.env.test
```

El entorno de testing utiliza una base de datos independiente:

```text
shipnow_test
```

El archivo `.env.test` se encuentra incluido en `.gitignore` y no debe subirse al repositorio.

### Ejecutar los tests

```bash
npm test
```

El script configura automÃ¡ticamente:

```text
NODE_ENV=test
```

y ejecuta la suite de Mocha.

### Resultado actual

```text
33 passing
```

### Cobertura

La suite valida:

- Ruta de Swagger.
- Endpoint de Logger.
- Usuarios.
- Pedidos.
- Entregas.
- GeneraciÃ³n de mocks.
- InserciÃ³n de usuarios mock.
- InserciÃ³n de datos mock completos.
- Cantidades invÃ¡lidas de mocks.
- Datos invÃ¡lidos de usuarios.
- Recursos inexistentes.
- Rutas inexistentes.
- Carga de documentos de usuarios.
- ValidaciÃ³n de archivo obligatorio.
- ValidaciÃ³n de tipo de documento.
- Carga de comprobantes de entregas.
- ValidaciÃ³n de comprobante obligatorio.
- ValidaciÃ³n de entregas inexistentes.

Los tests verifican tanto el status HTTP como la estructura y las propiedades importantes del body.

## MÃ³dulo 7 â€” Carga de archivos, documentos y comprobantes

Se implementÃ³ un sistema de carga de archivos utilizando Multer.

La funcionalidad permite:

- Cargar documentos asociados a usuarios.
- Cargar comprobantes asociados a entregas.
- Validar el tipo MIME de los archivos.
- Limitar el tamaÃ±o mÃ¡ximo de los archivos.
- Generar nombres Ãºnicos para los archivos.
- Separar los archivos de usuarios y entregas en directorios diferentes.
- Registrar la informaciÃ³n del archivo en MongoDB.
- Manejar errores mediante el sistema centralizado.

### Tipos de archivo permitidos

- PDF
- JPG / JPEG
- PNG

### TamaÃ±o mÃ¡ximo

```text
5 MB
```

### Directorio de almacenamiento

Los archivos se almacenan mediante un directorio configurable a travÃ©s de `UPLOAD_DIR`.

Si no se especifica, se utiliza un directorio temporal del sistema.

Los archivos generados no deben subirse al repositorio.

### Cargar documento de usuario

```http
POST /api/users/{userId}/documents
```

El request utiliza:

```text
multipart/form-data
```

Campo del archivo:

```text
document
```

Campo adicional:

```text
documentType
```

Ejemplo:

```text
documentType = DNI
```

### Cargar comprobante de entrega

```http
POST /api/deliveries/{deliveryId}/receipt
```

El request utiliza:

```text
multipart/form-data
```

Campo del archivo:

```text
receipt
```

### Errores relacionados con archivos

Ejemplo de respuesta:

```json
{
  "status": "error",
  "code": "FILE_REQUIRED",
  "message": "El archivo es obligatorio"
}
```

TambiÃ©n se controlan:

- Archivos demasiado grandes.
- Tipos MIME no permitidos.
- Campos de archivo no permitidos.
- Archivos faltantes.

## MÃ³dulo 8 â€” Performance, escalabilidad y Docker

En este mÃ³dulo se preparÃ³ ShipNow para una ejecuciÃ³n mÃ¡s estable y cercana a un entorno de producciÃ³n.

Se incorporaron:

- Control de listados mediante paginaciÃ³n y lÃ­mites.
- LÃ­mites de tamaÃ±o y tipos de archivo.
- ValidaciÃ³n de variables de entorno.
- Health check.
- Criterio de exposiciÃ³n de endpoints internos.
- Dockerfile.
- `.dockerignore`.
- EjecuciÃ³n de la API dentro de un contenedor Docker.
- DocumentaciÃ³n de ejecuciÃ³n y despliegue bÃ¡sico.

### PreparaciÃ³n para producciÃ³n

La aplicaciÃ³n utiliza variables de entorno para separar la configuraciÃ³n del cÃ³digo.

Las variables crÃ­ticas son validadas durante el inicio:

- `PORT`
- `MONGODB_URI`
- `NODE_ENV`
- `LOG_LEVEL`

Si alguna variable requerida no estÃ¡ definida, la aplicaciÃ³n falla durante el inicio mostrando un mensaje claro.

Los valores sensibles no se encuentran escritos directamente en el cÃ³digo.

### Endpoints internos

Los endpoints utilizados exclusivamente para desarrollo y testing tienen el siguiente criterio:

- Swagger estÃ¡ disponible en `development` y `test`.
- Mocks estÃ¡n disponibles en `development` y `test`.
- Logger de prueba estÃ¡ disponible en `development` y `test`.

Estos endpoints internos no se exponen en `production`.

El endpoint `/health` permanece disponible para verificar el estado de la API.

Este criterio permite utilizar herramientas de desarrollo y testing sin exponerlas innecesariamente en producciÃ³n.

### Docker

La API puede ejecutarse dentro de un contenedor Docker.

#### Dockerfile

El proyecto incluye un `Dockerfile` en la raÃ­z del repositorio.

El Dockerfile:

- Utiliza una imagen base de Node.js.
- Define `/app` como directorio de trabajo.
- Copia los archivos necesarios del proyecto.
- Instala las dependencias.
- Copia el cÃ³digo de la aplicaciÃ³n.
- Ejecuta la aplicaciÃ³n mediante `npm start`.

#### `.dockerignore`

El proyecto incluye un `.dockerignore` para evitar copiar archivos innecesarios, temporales o sensibles a la imagen.

Entre los archivos y directorios excluidos se encuentran:

- `node_modules`
- `.env`
- `.env.*`
- `.git`
- `.gitignore`
- `logs`
- `uploads`
- `coverage`
- `.nyc_output`
- `npm-debug.log*`
- `yarn-debug.log*`
- `yarn-error.log`
- `*.tmp`
- `*.temp`
- `.DS_Store`

#### Construir la imagen

Desde la raÃ­z del proyecto:

```
docker build -t shipnow .
```

#### Ejecutar el contenedor

Las variables de entorno pueden proporcionarse mediante un archivo externo:

```
docker run -p 8080:8080 --env-file .env -e LOG_LEVEL=info --name shipnow-container shipnow
```

La API queda disponible en:

http://localhost:8080

### Probar la aplicaciÃ³n dentro del contenedor

#### API

<http://localhost:8080>

Respuesta esperada:

```text
ShipNow API funcionando
```

#### Health Check

http://localhost:8080/health

#### Swagger

http://localhost:8080/api/docs

#### Endpoint principal

http://localhost:8080/api/users

El contenedor fue probado correctamente verificando:

- Inicio de la aplicaciÃ³n.
- ConexiÃ³n a MongoDB.
- Servidor escuchando en el puerto `8080`.
- Health check.
- Swagger.
- Endpoint principal.

### EjecuciÃ³n con Docker Compose

Docker Compose permite levantar la API junto con MongoDB.

Desde la raÃ­z del proyecto:

```
docker compose up -d --build
```

## Archivos que no deben subirse al repositorio

Los siguientes archivos y directorios contienen informaciÃ³n sensible, generada o temporal:

- `.env`
- `.env.*`
- `node_modules/`
- `.git/`
- `logs/`
- `uploads/`
- `coverage/`
- `.nyc_output/`
- `*.tmp`
- `*.temp`

Los archivos `.env` pueden contener credenciales o informaciÃ³n especÃ­fica del entorno y deben mantenerse fuera del repositorio.

## Logs y uploads

### Logs

Los logs se generan mediante Winston.

Los errores se almacenan mediante rotaciÃ³n diaria:

```text
logs/error-YYYY-MM-DD.log
```

La carpeta `logs/` no se incluye en el repositorio ni en la imagen Docker.

### Uploads

Los archivos cargados mediante Multer se almacenan fuera del repositorio.

El directorio puede configurarse mediante:

```env
UPLOAD_DIR=/ruta/del/directorio
```

Los uploads generados no se incluyen en la imagen Docker.

## Resultados de testing

La suite funcional completa se ejecuta correctamente:

```text
33 passing
```

La aplicaciÃ³n tambiÃ©n fue ejecutada mediante Docker verificando correctamente:

- ConexiÃ³n a MongoDB establecida.
- Servidor ShipNow escuchando en el puerto 8080.
- Health Check funcionando correctamente desde el contenedor.
- Acceso a Swagger/OpenAPI.
- Acceso a los endpoints principales.

## Entrega Final â€” ShipNow API

En esta entrega final se integran las funcionalidades desarrolladas durante los distintos mÃ³dulos del proyecto:

- Arquitectura por capas.
- GestiÃ³n de usuarios.
- GestiÃ³n de productos.
- GestiÃ³n de pedidos.
- GestiÃ³n de entregas.
- GeneraciÃ³n de datos simulados con Faker.
- Persistencia de mocks en MongoDB.
- Manejo centralizado de errores.
- Errores personalizados y diccionario de errores.
- Logging profesional con Winston.
- DocumentaciÃ³n interactiva mediante Swagger/OpenAPI.
- Testing funcional automatizado con Mocha, Chai y Supertest.
- PaginaciÃ³n y lÃ­mites en los listados.
- Carga de documentos de usuarios.
- Carga de comprobantes de entregas.
- ValidaciÃ³n de archivos y tipos MIME.
- ValidaciÃ³n de variables de entorno.
- Health Check.
- SeparaciÃ³n de entornos de desarrollo y testing.
- ConfiguraciÃ³n mediante archivos `.env`.
- Dockerfile.
- `.dockerignore`.
- EjecuciÃ³n de la API mediante Docker.
- EjecuciÃ³n conjunta de la API y MongoDB mediante Docker Compose.
- ProtecciÃ³n de archivos sensibles, logs y uploads.

### Accesos principales

Con la aplicaciÃ³n ejecutÃ¡ndose localmente:

- API: `http://localhost:8080`
- Health Check: `http://localhost:8080/health`
- Swagger/OpenAPI: `http://localhost:8080/api/docs`

## Autora

Sheila Magali Chiesa

Proyecto final â€” ShipNow API



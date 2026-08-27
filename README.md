## Módulo 3 - Manejo profesional de errores

En esta etapa se incorporó un sistema centralizado de manejo de errores para evitar respuestas de error aisladas en los controllers.

La gestión de errores está compuesta por:

- **Errores personalizados:** representan situaciones específicas del dominio, como usuario inexistente, pedido no encontrado, estado inválido, cantidad inválida de mocks y datos inválidos.
- **Diccionario de errores:** centraliza los códigos, mensajes y códigos de estado HTTP.
- **Middleware global:** recibe los errores mediante `next(error)` y genera la respuesta HTTP final.

Los controllers no responden directamente los errores. Cuando ocurre un error, lo derivan al middleware global.

### Estructura de respuesta de error

Todas las respuestas de error utilizan una estructura uniforme:

```json
{
    "status": "error",
    "code": "CODIGO_DEL_ERROR",
    "message": "Descripción del error"
}
```

### Ejemplo: usuario inexistente

Request:

```http
GET /api/users/000000000000000000000000
```

Response:

```json
{
    "status": "error",
    "code": "USER_NOT_FOUND",
    "message": "Usuario no encontrado"
}
```

Código HTTP: `404`

### Ejemplo: datos inválidos de usuario

Request:

```http
POST /api/users
```

Body:

```json
{
    "name": "Shei"
}
```

Response:

```json
{
    "status": "error",
    "code": "INVALID_USER_DATA",
    "message": "El nombre y el email son obligatorios"
}
```

Código HTTP: `400`

### Manejo de errores en el módulo de mocks

El módulo de mocks valida que la cantidad solicitada sea un número entero mayor a 0.

Por ejemplo:

```http
GET /api/mocks/users?qty=0
```

Response:

```json
{
    "status": "error",
    "code": "INVALID_MOCK_QUANTITY",
    "message": "La cantidad de mocks debe ser un número entero mayor a 0"
}
```

Código HTTP: `400`

También se controlan cantidades negativas, decimales y otros valores inválidos.

Las fallas producidas durante la carga de datos en MongoDB son derivadas al middleware global y reciben una respuesta de error interno con código HTTP `500`.

### Pruebas realizadas

Se verificó el funcionamiento del sistema mediante distintos casos:

- Cantidad de mocks igual a `0`.
- Cantidades negativas.
- Cantidades no enteras.
- Datos inválidos al crear usuarios.
- Datos inválidos al crear productos.
- Búsqueda de un usuario inexistente.
- Generación correcta de mocks con cantidades válidas.

## Autor

Proyecto realizado por Sheila Magali Chiesa como preentrega de los Módulos 2 y 3.
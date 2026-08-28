const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const fileController = require("../controllers/file.controller");
const { upload } = require("../config/multer/multer.config");

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     description: Obtiene la lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", userController.getAll);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crear un usuario
 *     description: Crea un nuevo usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sheila
 *               email:
 *                 type: string
 *                 example: sheila@email.com
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos de usuario inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INVALID_USER_DATA
 *               message: El nombre y el email son obligatorios
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INTERNAL_SERVER_ERROR
 *               message: Error interno del servidor
 */
router.post("/", userController.create);

/**
 * @swagger
 * /api/users/{userId}/documents:
 *   post:
 *     tags:
 *       - Users
 *     summary: Subir documento de usuario
 *     description: Permite cargar un documento asociado a un usuario existente.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *               - documentType
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF, JPG o PNG de hasta 5 MB.
 *               documentType:
 *                 type: string
 *                 enum:
 *                   - DNI
 *                   - LICENCIA
 *                   - OTRO
 *                 example: DNI
 *     responses:
 *       201:
 *         description: Documento cargado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Documento cargado correctamente
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Archivo faltante, tipo de archivo inválido o tipo de documento inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       413:
 *         description: El archivo supera el tamaño máximo permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al guardar el archivo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/:userId/documents",
    upload.single("document"),
    fileController.uploadUserDocument
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener un usuario por ID
 *     description: Obtiene un usuario específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", userController.getById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar un usuario
 *     description: Actualiza un usuario existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sheila
 *               email:
 *                 type: string
 *                 example: sheila@email.com
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", userController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *           example: 64f1a2b3c4d5e6f789012345
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", userController.delete);

module.exports = router;
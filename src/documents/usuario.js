/**
 * @swagger
 * /user/registrar:
 *   post:
 *     summary: Registrar Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Emersson"
 *               apellidos:
 *                 type: string
 *                 example: "String"
 *               correo:
 *                 type: string
 *                 example: "String"
 *               numero_documento:
 *                 type: string
 *                 example: "String"
 *               tipo_documento:
 *                 type: string
 *                 example: "String"
 *               contrasenia:
 *                 type: string
 *                 example: "String"
 *               especialidad:
 *                 type: string
 *                 example: "String"
 *               empresa:
 *                 type: string
 *                 example: "String"
 *               rol:
 *                 type: string
 *                 example: "String"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 */

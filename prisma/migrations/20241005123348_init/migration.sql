-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_identificacion` ENUM('AS', 'CC', 'CE', 'MV', 'RC', 'TI') NOT NULL,
    `identificacion` BIGINT NOT NULL,
    `primer_nombre` VARCHAR(50) NOT NULL,
    `segundo_nombre` VARCHAR(50) NULL,
    `primer_apellido` VARCHAR(50) NOT NULL,
    `segundo_apellido` VARCHAR(50) NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `sexo` ENUM('Femenino', 'Masculino', 'Indetermidado') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `tipo_usuario` ENUM('Contributivo', 'Subsidiado', 'Vinculado', 'Particular', 'Otro') NOT NULL,
    `municipio` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `eps` INTEGER NOT NULL,

    UNIQUE INDEX `usuarios_identificacion_key`(`identificacion`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eps` (
    `id_eps` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,

    PRIMARY KEY (`id_eps`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedimientos` (
    `id_procedimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `consecutivo` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `factura` INTEGER NOT NULL,
    `usuario` INTEGER NOT NULL,
    `acuerdo` INTEGER NOT NULL,

    PRIMARY KEY (`id_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departamentos` (
    `id_departamento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_departamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipios` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `departamento` INTEGER NOT NULL,

    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicios` (
    `id_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `iva` DECIMAL(10, 2) NOT NULL,
    `nivel` INTEGER NOT NULL,
    `tarifa` INTEGER NOT NULL,
    `protocolo` INTEGER NOT NULL,
    `prestador` INTEGER NOT NULL,

    PRIMARY KEY (`id_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prestadores` (
    `id_prestador` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` BIGINT NOT NULL,
    `razon_social` VARCHAR(50) NOT NULL,
    `consecutivo` INTEGER NOT NULL,

    PRIMARY KEY (`id_prestador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleados` (
    `id_empleado` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` BIGINT NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `cargo` VARCHAR(50) NOT NULL,
    `rol` ENUM('Administrador', 'Facturacion', 'Bacteriologo') NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `prestador` INTEGER NOT NULL,

    PRIMARY KEY (`id_empleado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tarifas` (
    `id_tarifa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,

    PRIMARY KEY (`id_tarifa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Protocolos` (
    `id_protocolo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,

    PRIMARY KEY (`id_protocolo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresas` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nit` VARCHAR(530) NOT NULL,
    `codigo` INTEGER NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `sigla` VARCHAR(50) NOT NULL,
    `tipo` ENUM('Particular', 'Empresa', 'Eps', 'Esess') NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `municipio` INTEGER NOT NULL,

    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contratos` (
    `id_contrato` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `empresa` INTEGER NOT NULL,

    PRIMARY KEY (`id_contrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acuerdos` (
    `id_acuerdo` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `contrato` INTEGER NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `tarifa` INTEGER NOT NULL,

    PRIMARY KEY (`id_acuerdo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_eps_fkey` FOREIGN KEY (`eps`) REFERENCES `eps`(`id_eps`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_acuerdo_fkey` FOREIGN KEY (`acuerdo`) REFERENCES `Acuerdos`(`id_acuerdo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_usuario_fkey` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Municipios` ADD CONSTRAINT `Municipios_departamento_fkey` FOREIGN KEY (`departamento`) REFERENCES `departamentos`(`id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_tarifa_fkey` FOREIGN KEY (`tarifa`) REFERENCES `tarifas`(`id_tarifa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_protocolo_fkey` FOREIGN KEY (`protocolo`) REFERENCES `Protocolos`(`id_protocolo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_prestador_fkey` FOREIGN KEY (`prestador`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_prestador_fkey` FOREIGN KEY (`prestador`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresas` ADD CONSTRAINT `Empresas_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contratos` ADD CONSTRAINT `Contratos_empresa_fkey` FOREIGN KEY (`empresa`) REFERENCES `Empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_contrato_fkey` FOREIGN KEY (`contrato`) REFERENCES `Contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_tarifa_fkey` FOREIGN KEY (`tarifa`) REFERENCES `tarifas`(`id_tarifa`) ON DELETE RESTRICT ON UPDATE CASCADE;

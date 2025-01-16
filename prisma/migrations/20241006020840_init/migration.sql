-- CreateTable
CREATE TABLE `detalles_servicios` (
    `id_axamen` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `servicio` INTEGER NOT NULL,
    `examen` INTEGER NOT NULL,

    PRIMARY KEY (`id_axamen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examenes` (
    `id_axamen` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `unidades` VARCHAR(30) NOT NULL,
    `valor_referencia` VARCHAR(30) NOT NULL,
    `resultado` VARCHAR(30) NOT NULL,
    `tecnica` VARCHAR(30) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `grupo` INTEGER NOT NULL,

    PRIMARY KEY (`id_axamen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupos` (
    `id_grupo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,

    PRIMARY KEY (`id_grupo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalles_servicios` ADD CONSTRAINT `detalles_servicios_servicio_fkey` FOREIGN KEY (`servicio`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalles_servicios` ADD CONSTRAINT `detalles_servicios_examen_fkey` FOREIGN KEY (`examen`) REFERENCES `examenes`(`id_axamen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_grupo_fkey` FOREIGN KEY (`grupo`) REFERENCES `grupos`(`id_grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

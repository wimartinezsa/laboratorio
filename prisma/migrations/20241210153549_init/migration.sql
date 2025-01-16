-- DropForeignKey
ALTER TABLE `resultados` DROP FOREIGN KEY `resultados_examenId_fkey`;

-- DropForeignKey
ALTER TABLE `resultados` DROP FOREIGN KEY `resultados_parametroId_fkey`;

-- AddForeignKey
ALTER TABLE `resultados` ADD CONSTRAINT `resultados_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultados` ADD CONSTRAINT `resultados_parametroId_fkey` FOREIGN KEY (`parametroId`) REFERENCES `Parametros`(`id_parametro`) ON DELETE CASCADE ON UPDATE CASCADE;

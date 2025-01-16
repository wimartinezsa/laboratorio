-- AlterTable
ALTER TABLE `prestaciones` MODIFY `fecha_resultado` DATETIME(3) NULL,
    MODIFY `resultado` VARCHAR(30) NULL,
    MODIFY `observacion` VARCHAR(200) NULL,
    MODIFY `profesional` INTEGER NULL;

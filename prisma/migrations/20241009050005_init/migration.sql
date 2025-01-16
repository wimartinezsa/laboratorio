/*
  Warnings:

  - You are about to drop the column `empresa` on the `contratos` table. All the data in the column will be lost.
  - You are about to drop the column `municipio` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `procedimiento` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the column `tarifa` on the `estudios` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_examen` on the `examenes` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `municipios` table. All the data in the column will be lost.
  - You are about to drop the column `contrato` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_procedimiento` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `procedimientos` table. All the data in the column will be lost.
  - You are about to drop the column `prestador` on the `profesionales` table. All the data in the column will be lost.
  - You are about to drop the column `prestador` on the `servicios` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_servicio` on the `servicios` table. All the data in the column will be lost.
  - You are about to drop the column `contrato` on the `tarifas` table. All the data in the column will be lost.
  - You are about to drop the column `examen` on the `tarifas` table. All the data in the column will be lost.
  - You are about to drop the column `servicio` on the `tarifas` table. All the data in the column will be lost.
  - You are about to drop the column `examen` on the `tipos_resultados` table. All the data in the column will be lost.
  - You are about to drop the column `eps` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `municipio` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `empresaId` to the `Contratos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipioId` to the `Empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procedimientoId` to the `Estudios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tarifaId` to the `Estudios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_examenId` to the `examenes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamentoId` to the `Municipios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contratoId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_procedimientoId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prestadorId` to the `profesionales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prestadorId` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_servicioId` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contratoId` to the `Tarifas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examenId` to the `Tarifas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicioId` to the `Tarifas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examenId` to the `tipos_resultados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `epsId` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipioId` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contratos` DROP FOREIGN KEY `Contratos_empresa_fkey`;

-- DropForeignKey
ALTER TABLE `empresas` DROP FOREIGN KEY `Empresas_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_procedimiento_fkey`;

-- DropForeignKey
ALTER TABLE `estudios` DROP FOREIGN KEY `Estudios_tarifa_fkey`;

-- DropForeignKey
ALTER TABLE `examenes` DROP FOREIGN KEY `examenes_tipo_examen_fkey`;

-- DropForeignKey
ALTER TABLE `municipios` DROP FOREIGN KEY `Municipios_departamento_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_contrato_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_tipo_procedimiento_fkey`;

-- DropForeignKey
ALTER TABLE `procedimientos` DROP FOREIGN KEY `procedimientos_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `profesionales` DROP FOREIGN KEY `profesionales_prestador_fkey`;

-- DropForeignKey
ALTER TABLE `servicios` DROP FOREIGN KEY `Servicios_prestador_fkey`;

-- DropForeignKey
ALTER TABLE `servicios` DROP FOREIGN KEY `Servicios_tipo_servicio_fkey`;

-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_contrato_fkey`;

-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_examen_fkey`;

-- DropForeignKey
ALTER TABLE `tarifas` DROP FOREIGN KEY `Tarifas_servicio_fkey`;

-- DropForeignKey
ALTER TABLE `tipos_resultados` DROP FOREIGN KEY `tipos_resultados_examen_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_eps_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_municipio_fkey`;

-- AlterTable
ALTER TABLE `contratos` DROP COLUMN `empresa`,
    ADD COLUMN `empresaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `empresas` DROP COLUMN `municipio`,
    ADD COLUMN `municipioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `estudios` DROP COLUMN `procedimiento`,
    DROP COLUMN `tarifa`,
    ADD COLUMN `procedimientoId` INTEGER NOT NULL,
    ADD COLUMN `tarifaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `tipo_examen`,
    ADD COLUMN `tipo_examenId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `municipios` DROP COLUMN `departamento`,
    ADD COLUMN `departamentoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `contrato`,
    DROP COLUMN `tipo_procedimiento`,
    DROP COLUMN `usuario`,
    ADD COLUMN `contratoId` INTEGER NOT NULL,
    ADD COLUMN `tipo_procedimientoId` INTEGER NOT NULL,
    ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `profesionales` DROP COLUMN `prestador`,
    ADD COLUMN `prestadorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `servicios` DROP COLUMN `prestador`,
    DROP COLUMN `tipo_servicio`,
    ADD COLUMN `prestadorId` INTEGER NOT NULL,
    ADD COLUMN `tipo_servicioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tarifas` DROP COLUMN `contrato`,
    DROP COLUMN `examen`,
    DROP COLUMN `servicio`,
    ADD COLUMN `contratoId` INTEGER NOT NULL,
    ADD COLUMN `examenId` INTEGER NOT NULL,
    ADD COLUMN `servicioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tipos_resultados` DROP COLUMN `examen`,
    ADD COLUMN `examenId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `eps`,
    DROP COLUMN `municipio`,
    ADD COLUMN `epsId` INTEGER NOT NULL,
    ADD COLUMN `municipioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_epsId_fkey` FOREIGN KEY (`epsId`) REFERENCES `eps`(`id_eps`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_tipo_procedimientoId_fkey` FOREIGN KEY (`tipo_procedimientoId`) REFERENCES `Tito_procedimiento`(`id_tipo_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_tarifaId_fkey` FOREIGN KEY (`tarifaId`) REFERENCES `Tarifas`(`id_tarifa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estudios` ADD CONSTRAINT `Estudios_procedimientoId_fkey` FOREIGN KEY (`procedimientoId`) REFERENCES `procedimientos`(`id_procedimiento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Municipios` ADD CONSTRAINT `Municipios_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamentos`(`id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_tipo_servicioId_fkey` FOREIGN KEY (`tipo_servicioId`) REFERENCES `tipos_servicios`(`id_tipo_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_tipo_examenId_fkey` FOREIGN KEY (`tipo_examenId`) REFERENCES `tipos_Examenes`(`id_tipo_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tipos_resultados` ADD CONSTRAINT `tipos_resultados_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profesionales` ADD CONSTRAINT `profesionales_prestadorId_fkey` FOREIGN KEY (`prestadorId`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresas` ADD CONSTRAINT `Empresas_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contratos` ADD CONSTRAINT `Contratos_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id_examen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contratos`(`id_contrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tarifas` ADD CONSTRAINT `Tarifas_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

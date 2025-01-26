/*
  Warnings:

  - A unique constraint covering the columns `[contratoId,procedimientoId]` on the table `acuerdos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `acuerdos_contratoId_procedimientoId_key` ON `acuerdos`(`contratoId`, `procedimientoId`);

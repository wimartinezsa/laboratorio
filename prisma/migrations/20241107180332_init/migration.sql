/*
  Warnings:

  - You are about to drop the column `createAt` on the `acuerdos` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `acuerdos` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `facturas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nit]` on the table `Empresas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `total` to the `facturas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `acuerdos` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`;

-- AlterTable
ALTER TABLE `facturas` DROP COLUMN `estado`,
    ADD COLUMN `Estado_Factura` ENUM('Solicitud', 'Facturado', 'Cobrado') NOT NULL DEFAULT 'Solicitud',
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Empresas_nit_key` ON `Empresas`(`nit`);

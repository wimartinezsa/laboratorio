/*
  Warnings:

  - You are about to drop the column `Estado_Factura` on the `facturas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `facturas` DROP COLUMN `Estado_Factura`,
    ADD COLUMN `estado` ENUM('Solicitud', 'Facturado', 'Cobrado') NOT NULL DEFAULT 'Solicitud';

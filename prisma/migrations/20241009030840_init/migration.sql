/*
  Warnings:

  - You are about to alter the column `identificacion` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `usuarios` MODIFY `identificacion` BIGINT NOT NULL;

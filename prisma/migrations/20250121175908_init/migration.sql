/*
  Warnings:

  - The primary key for the `vinculaciones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_vincuacion` on the `vinculaciones` table. All the data in the column will be lost.
  - Added the required column `id_vinculacion` to the `vinculaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vinculaciones` DROP PRIMARY KEY,
    DROP COLUMN `id_vincuacion`,
    ADD COLUMN `id_vinculacion` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_vinculacion`);

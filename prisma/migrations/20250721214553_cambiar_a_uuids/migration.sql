/*
  Warnings:

  - The primary key for the `alimentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `taco_alimentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tacos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tortillas` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `taco_alimentos` DROP FOREIGN KEY `taco_alimentos_alimentoId_fkey`;

-- DropForeignKey
ALTER TABLE `taco_alimentos` DROP FOREIGN KEY `taco_alimentos_tacoId_fkey`;

-- DropForeignKey
ALTER TABLE `tacos` DROP FOREIGN KEY `tacos_salsaId_fkey`;

-- DropForeignKey
ALTER TABLE `tacos` DROP FOREIGN KEY `tacos_tortillaId_fkey`;

-- DropIndex
DROP INDEX `taco_alimentos_alimentoId_fkey` ON `taco_alimentos`;

-- DropIndex
DROP INDEX `tacos_salsaId_fkey` ON `tacos`;

-- DropIndex
DROP INDEX `tacos_tortillaId_fkey` ON `tacos`;

-- AlterTable
ALTER TABLE `alimentos` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `taco_alimentos` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `tacoId` VARCHAR(191) NOT NULL,
    MODIFY `alimentoId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tacos` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `tortillaId` VARCHAR(191) NOT NULL,
    MODIFY `salsaId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tortillas` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tacos` ADD CONSTRAINT `tacos_tortillaId_fkey` FOREIGN KEY (`tortillaId`) REFERENCES `tortillas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tacos` ADD CONSTRAINT `tacos_salsaId_fkey` FOREIGN KEY (`salsaId`) REFERENCES `alimentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taco_alimentos` ADD CONSTRAINT `taco_alimentos_tacoId_fkey` FOREIGN KEY (`tacoId`) REFERENCES `tacos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taco_alimentos` ADD CONSTRAINT `taco_alimentos_alimentoId_fkey` FOREIGN KEY (`alimentoId`) REFERENCES `alimentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

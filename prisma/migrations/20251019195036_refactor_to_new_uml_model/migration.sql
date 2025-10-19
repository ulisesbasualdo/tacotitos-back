/*
  Warnings:

  - Complete database schema refactor to match new UML model
  - Converting from UUID-based IDs to auto-incremental integer IDs
  - Splitting alimentos table into separate fillings and sauces tables
  - All existing data will be lost in this migration

*/

-- Drop all existing foreign keys
ALTER TABLE `taco_alimentos` DROP FOREIGN KEY `taco_alimentos_alimentoId_fkey`;
ALTER TABLE `taco_alimentos` DROP FOREIGN KEY `taco_alimentos_tacoId_fkey`;
ALTER TABLE `tacos` DROP FOREIGN KEY `tacos_salsaId_fkey`;
ALTER TABLE `tacos` DROP FOREIGN KEY `tacos_tortillaId_fkey`;

-- Drop all existing tables
DROP TABLE IF EXISTS `taco_alimentos`;
DROP TABLE IF EXISTS `tacos`;
DROP TABLE IF EXISTS `alimentos`;
DROP TABLE IF EXISTS `tortillas`;

-- Create new tortillas table with integer IDs
CREATE TABLE `tortillas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `tipoTortilla` VARCHAR(191) NOT NULL DEFAULT 'single',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create new tacos table with integer IDs
CREATE TABLE `tacos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tortillaId` INTEGER NOT NULL,
    `sauceId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fillings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sauces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taco_fillings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tacoId` INTEGER NOT NULL,
    `fillingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `taco_fillings_tacoId_fillingId_key`(`tacoId`, `fillingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tacos` ADD CONSTRAINT `tacos_tortillaId_fkey` FOREIGN KEY (`tortillaId`) REFERENCES `tortillas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tacos` ADD CONSTRAINT `tacos_sauceId_fkey` FOREIGN KEY (`sauceId`) REFERENCES `sauces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taco_fillings` ADD CONSTRAINT `taco_fillings_tacoId_fkey` FOREIGN KEY (`tacoId`) REFERENCES `tacos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taco_fillings` ADD CONSTRAINT `taco_fillings_fillingId_fkey` FOREIGN KEY (`fillingId`) REFERENCES `fillings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `taco_alimentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tacoId` INTEGER NOT NULL,
    `alimentoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `taco_alimentos_tacoId_alimentoId_key`(`tacoId`, `alimentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `taco_alimentos` ADD CONSTRAINT `taco_alimentos_tacoId_fkey` FOREIGN KEY (`tacoId`) REFERENCES `tacos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taco_alimentos` ADD CONSTRAINT `taco_alimentos_alimentoId_fkey` FOREIGN KEY (`alimentoId`) REFERENCES `alimentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

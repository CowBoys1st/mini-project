/*
  Warnings:

  - You are about to drop the column `referralCode` on the `promotion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[PromotionCode]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PromotionCode` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `referralCode`,
    ADD COLUMN `PromotionCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `used` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Promotion_PromotionCode_key` ON `Promotion`(`PromotionCode`);

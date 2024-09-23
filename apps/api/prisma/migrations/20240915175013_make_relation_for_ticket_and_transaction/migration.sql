/*
  Warnings:

  - Added the required column `transactionId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `transactionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `EventTransaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

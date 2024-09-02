-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_userId_fkey`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

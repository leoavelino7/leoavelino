/*
  Warnings:

  - You are about to drop the column `className` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `className`;

-- AlterTable
ALTER TABLE `posts` MODIFY `thumbnailLarge` VARCHAR(191) NOT NULL DEFAULT 'https://via.placeholder.com/1140x641';

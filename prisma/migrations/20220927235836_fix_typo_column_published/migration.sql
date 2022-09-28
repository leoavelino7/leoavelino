/*
  Warnings:

  - You are about to drop the column `publised` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `posts` DROP COLUMN `publised`,
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;

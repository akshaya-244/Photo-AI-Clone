/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Pack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pack" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imageUrl2" TEXT NOT NULL DEFAULT '';

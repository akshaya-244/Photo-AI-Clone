/*
  Warnings:

  - You are about to drop the column `emailId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailId",
ADD COLUMN     "email" TEXT NOT NULL DEFAULT '';

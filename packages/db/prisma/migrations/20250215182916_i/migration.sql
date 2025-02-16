/*
  Warnings:

  - Made the column `falAiRequestId` on table `GeneratedImages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GeneratedImages" ALTER COLUMN "falAiRequestId" SET NOT NULL;

/*
  Warnings:

  - Made the column `zipUrl` on table `Models` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Models" ALTER COLUMN "zipUrl" SET NOT NULL;

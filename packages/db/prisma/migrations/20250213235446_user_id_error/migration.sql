/*
  Warnings:

  - You are about to drop the column `userId` on the `TrainingImages` table. All the data in the column will be lost.
  - Added the required column `userId` to the `GeneratedImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneratedImages" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrainingImages" DROP COLUMN "userId";

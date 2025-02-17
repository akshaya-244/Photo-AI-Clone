/*
  Warnings:

  - The values [Man,Woman,Other] on the enum `ModelTypeEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [White,Black,Asian_American,South_East_Asian,East_Asian,South_Asian,Middle_Eastern,Pacific,Hispanic] on the enum `ethnicityEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Brown,Blue,Hazel,Gray,Black] on the enum `eyeColorEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelTypeEnum_new" AS ENUM ('man', 'woman', 'other');
ALTER TABLE "Models" ALTER COLUMN "type" TYPE "ModelTypeEnum_new" USING ("type"::text::"ModelTypeEnum_new");
ALTER TYPE "ModelTypeEnum" RENAME TO "ModelTypeEnum_old";
ALTER TYPE "ModelTypeEnum_new" RENAME TO "ModelTypeEnum";
DROP TYPE "ModelTypeEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ethnicityEnum_new" AS ENUM ('white', 'black', 'asian_american', 'south_east_asian', 'east_asian', 'south_asian', 'middle_eastern', 'pacific', 'hispanic');
ALTER TABLE "Models" ALTER COLUMN "ethnicity" TYPE "ethnicityEnum_new" USING ("ethnicity"::text::"ethnicityEnum_new");
ALTER TYPE "ethnicityEnum" RENAME TO "ethnicityEnum_old";
ALTER TYPE "ethnicityEnum_new" RENAME TO "ethnicityEnum";
DROP TYPE "ethnicityEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "eyeColorEnum_new" AS ENUM ('brown', 'blue', 'hazel', 'gray', 'black');
ALTER TABLE "Models" ALTER COLUMN "eyeColor" TYPE "eyeColorEnum_new" USING ("eyeColor"::text::"eyeColorEnum_new");
ALTER TYPE "eyeColorEnum" RENAME TO "eyeColorEnum_old";
ALTER TYPE "eyeColorEnum_new" RENAME TO "eyeColorEnum";
DROP TYPE "eyeColorEnum_old";
COMMIT;

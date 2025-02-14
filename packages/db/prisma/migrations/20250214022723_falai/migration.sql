-- AlterTable
ALTER TABLE "GeneratedImages" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "zipUrl" TEXT;

-- AlterTable
ALTER TABLE "Models" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "trainingStatus" "OutputImageStatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "triggerWord" TEXT;

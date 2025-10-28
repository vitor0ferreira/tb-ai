-- AlterTable
ALTER TABLE "AnalysisLog" ALTER COLUMN "client_ip" DROP NOT NULL,
ALTER COLUMN "error" DROP NOT NULL,
ALTER COLUMN "duration_ms" DROP NOT NULL,
ALTER COLUMN "probability_tuberculosis" DROP NOT NULL;

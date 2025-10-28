-- CreateTable
CREATE TABLE "AnalysisLog" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_ip" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "duration_ms" DOUBLE PRECISION NOT NULL,
    "probability_tuberculosis" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AnalysisLog_pkey" PRIMARY KEY ("id")
);

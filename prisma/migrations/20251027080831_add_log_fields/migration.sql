/*
  Warnings:

  - Added the required column `userId` to the `AnalysisLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalysisLog" ADD COLUMN     "userId" TEXT NOT NULL;

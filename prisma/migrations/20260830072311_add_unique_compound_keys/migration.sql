/*
  Warnings:

  - A unique constraint covering the columns `[id,researchId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `Research` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,researchId]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_id_researchId_key" ON "Note"("id", "researchId");

-- CreateIndex
CREATE UNIQUE INDEX "Research_id_userId_key" ON "Research"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Source_id_researchId_key" ON "Source"("id", "researchId");

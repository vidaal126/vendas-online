/*
  Warnings:

  - You are about to drop the column `total_amount` on the `Transation` table. All the data in the column will be lost.
  - Added the required column `category` to the `Transation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Types" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('INVESTIMENTO', 'SALARIO', 'DESPESA');

-- AlterTable
ALTER TABLE "Transation" DROP COLUMN "total_amount",
ADD COLUMN     "category" "Categories" NOT NULL,
ADD COLUMN     "type" "Types" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Transation" ADD CONSTRAINT "Transation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

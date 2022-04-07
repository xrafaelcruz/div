/*
  Warnings:

  - You are about to drop the column `idUser` on the `UserGroup` table. All the data in the column will be lost.
  - Added the required column `userName` to the `UserGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserGroup" DROP CONSTRAINT "UserGroup_idUser_fkey";

-- AlterTable
ALTER TABLE "UserGroup" DROP COLUMN "idUser",
ADD COLUMN     "userName" TEXT NOT NULL;

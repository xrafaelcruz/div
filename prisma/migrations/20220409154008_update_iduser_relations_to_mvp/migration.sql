/*
  Warnings:

  - You are about to drop the column `idPayerUser` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `ExpenseUserGroup` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `UserGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_idPayerUser_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseUserGroup" DROP CONSTRAINT "ExpenseUserGroup_idUser_fkey";

-- DropForeignKey
ALTER TABLE "UserGroup" DROP CONSTRAINT "UserGroup_idUser_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "idPayerUser";

-- AlterTable
ALTER TABLE "ExpenseUserGroup" DROP COLUMN "idUser";

-- AlterTable
ALTER TABLE "UserGroup" DROP COLUMN "idUser";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_ownerUserEmail_fkey";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_ownerUserEmail_fkey" FOREIGN KEY ("ownerUserEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

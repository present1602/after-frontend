/*
  Warnings:

  - You are about to drop the column `userId` on the `user_profile_image` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `user_profile_image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_profile_image" DROP CONSTRAINT "user_profile_image_userId_fkey";

-- AlterTable
ALTER TABLE "user_profile_image" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user_profile_image" ADD CONSTRAINT "user_profile_image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

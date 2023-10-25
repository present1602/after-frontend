-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birth_date" TEXT,
ADD COLUMN     "last_logged_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "member_type" TEXT NOT NULL DEFAULT '10',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ALTER COLUMN "login_type" SET DEFAULT 'email';

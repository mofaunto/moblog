-- CreateTable
CREATE TABLE "Talaba" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "ism" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Talaba_email_key" ON "Talaba"("email");

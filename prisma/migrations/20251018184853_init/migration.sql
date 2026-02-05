-- CreateTable
CREATE TABLE "Url" (
    "hash" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("hash")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_hash_key" ON "Url"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Url_original_key" ON "Url"("original");

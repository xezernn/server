-- CreateTable
CREATE TABLE "Slider" (
    "id" SERIAL NOT NULL,
    "img" TEXT[],
    "categoryId" INTEGER NOT NULL,
    "subcategoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slider" ADD CONSTRAINT "Slider_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slider" ADD CONSTRAINT "Slider_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

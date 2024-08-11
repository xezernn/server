const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

const productSchema = z.object({
  img: z.array(z.string().url({ message: 'Invalid URL format' })).nonempty({ message: 'At least one image URL is required' }).optional(),
  name: z.string()
    .min(3, { message: 'Product name must be at least 3 characters long' })
    .max(255, { message: 'Product name must be less than 255 characters' })
    .trim().optional(),
  price: z.number()
    .positive({ message: 'Price must be a positive number' })
    .min(0.01, { message: 'Price must be at least 0.01' })
    .max(10000, { message: 'Price must be less than 10,000' }).optional(),
  discount: z.number()
    .min(0, { message: 'Discount must be at least 0' })
    .int({ message: 'Discount must be an integer' })
    .max(100, { message: 'Discount must be less than or equal to 100' }).optional(),
  categoryId: z.number()
    .int({ message: 'Category ID must be an integer' })
    .positive({ message: 'Category ID must be a positive integer' }).optional(),
  subcategoryId: z.number()
    .int({ message: 'Subcategory ID must be an integer' })
    .positive({ message: 'Subcategory ID must be a positive integer' }).optional(),
  description: z.string()
    .min(3, { message: 'Product description must be at least 3 characters long' })
    .max(1000, { message: 'Product description must be less than 1000 characters' })
    .trim().optional(),
  metadata: z.string().optional(),
  isTopSelling: z.boolean().optional() 
});


const editProduct = async (req, res) => {
  const { price, discount, categoryId, subcategoryId } = req.body;
  const obj = {
    ...req.body,
    price: Number(price),
    discount: Number(discount),
    categoryId: Number(categoryId),
    subcategoryId: Number(subcategoryId),
    isTopSelling: req.body.isTopSelling === 'true'
  };

  const parseResult = productSchema.safeParse(obj);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.format() });
  }

  try {
    const id = Number(req.params.id);
    const files = req.files;
    const img = files.map(file => file.location);
    const { name, price, discount, categoryId, subcategoryId, description, metadata, isTopSelling } = parseResult.data;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        img,
        name,
        price,
        discount,
        categoryId,
        subcategoryId,
        description,
        metadata,
        isTopSelling
      }
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = editProduct;

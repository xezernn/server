const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const productSchema = require('../../schema/product.schema');
const prisma = new PrismaClient();

// Product schema for validation

// Controller function to create a product
const createProduct = async (req, res) => {
    // Parse and validate input data using Zod schema
    const parseResult = productSchema.safeParse({
        ...req.body,
        price: parseFloat(req.body.price),
        discount: parseInt(req.body.discount),
        categoryId: parseInt(req.body.categoryId),
        subcategoryId: parseInt(req.body.subcategoryId)
    });

    // Return validation errors if input is not valid
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }

    try {
        const {
            name, description, price, discount, img,
            categoryId, subcategoryId, isTopSelling,
        } = parseResult.data;

        // Check if category and subcategory exist in the database
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        const subcategory = await prisma.subcategory.findUnique({
            where: { id: subcategoryId }
        });

        if (!category || !subcategory) {
            return res.status(400).json({ error: 'Kateqoriya və ya alt kateqoriya mövcud deyil' });
        }

        // Create the new product
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                discount,
                img,
                categoryId,
                subcategoryId,
                isTopSelling,
            }
        });

        // Return the newly created product as a response
        res.status(201).json({ status: true, product });

    } catch (error) {
        // Handle any unexpected errors
        console.log(error);
        res.status(500).json({ error: 'Daxili server xətası' });
    }
};

module.exports = createProduct;

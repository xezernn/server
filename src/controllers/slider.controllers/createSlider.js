const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const sliderSchema = z.object({
    img: z.array(z.string().url({ message: 'Invalid URL format' })).nonempty({ message: 'At least one image URL is required' }),
    categoryId: z.number()
        .int({ message: 'Category ID must be an integer' })
        .positive({ message: 'Category ID must be a positive integer' }),
    subcategoryId: z.number()
        .int({ message: 'Category ID must be an integer' })
        .positive({ message: 'Category ID must be a positive integer' })
});

const createSlider = async (req, res) => {
    const files = req.files;
    const img = files.map(file => file.location);

    const parseResult = sliderSchema.safeParse({
        ...req.body,
        img,
        categoryId: parseInt(req.body.categoryId),
        subcategoryId: parseInt(req.body.subcategoryId),
    });

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }

    try {
        const { categoryId, subcategoryId } = parseResult.data;
        const slider = await prisma.slider.create({
            data: {
                img,
                categoryId,
                subcategoryId,
            }
        });
        res.status(201).json(slider);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = createSlider;

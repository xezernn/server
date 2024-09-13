const { PrismaClient } = require('@prisma/client');
const sliderSchema = require('../../schema/slider.schema');
const prisma = new PrismaClient();

const createSlider = async (req, res) => {
    const { img, categoryId, subcategoryId } = req.body
    const parseResult = sliderSchema.safeParse({
        img,
        categoryId: parseInt(categoryId),
        subcategoryId: parseInt(subcategoryId)
    });

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format().name._errors[0] });
    }

    try {
        const { categoryId, subcategoryId, img } = parseResult.data;
        const slider = await prisma.slider.create({
            data: {
                img,
                categoryId,
                subcategoryId,
            }
        });

        res.status(201).json(slider);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = createSlider;

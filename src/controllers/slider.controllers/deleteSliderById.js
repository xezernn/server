const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const deleteSliderById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = await prisma.slider.findUnique({
            where: { id }
        })

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const deleteSlider = await prisma.slider.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Product deleted successfully', deleteSlider });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteSliderById;

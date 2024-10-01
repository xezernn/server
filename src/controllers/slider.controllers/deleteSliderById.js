const { PrismaClient } = require('@prisma/client');
const deleteImageByPathname = require('../img.controller/deleteImgByPathname');
const prisma = new PrismaClient();

const deleteSliderById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const slider = await prisma.slider.findUnique({
            where: { id }
        });

        if (!slider) {
            return res.status(404).json({ error: 'Slider not found' });
        }

        const deleteElem = await deleteImageByPathname(slider.img)

        const deletedSlider = await prisma.slider.delete({
            where: { id }
        });

        res.status(200).json({ message: 'Slider deleted successfully', deletedSlider });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteSliderById;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSliders = async (req, res) => {
  try {
    const sliders = await prisma.slider.findMany({
      select: {
        id: true,
        img: true,
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getSliders;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSliders = async (req, res) => {
  try {
    const sliders = await prisma.slider.findMany({
      select: {
        id: true,
        img: true,
        category: true,
        subcategory: true
      },
    });

    const newSlider = sliders.map(item => {
      return  {
        ...item,
        slug: item.category.categoryName.toLocaleLowerCase("tr-Az").split(" ").join("-") + "/" +  item.subcategory.categoryName.toLocaleLowerCase("tr-Az").split(" ").join("-") 
      }
    })

    res.status(200).json(newSlider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getSliders;

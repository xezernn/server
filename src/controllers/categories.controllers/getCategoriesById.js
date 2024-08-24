const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getCategoriesById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!id) return res.status(400).json({ error: 'Məhsulun id-si mütləq rəqəm olmalıdır!' });

        const categories = await prisma.category.findMany({
            where: { id: id },
            include: {
                Subcategory: {
                    select: {
                        id: true,
                        categoryName: true
                    }
                }
            }
        });

        const yeniObj = { ...categories[0], subcategory: categories[0].Subcategory }
        delete yeniObj.Subcategory
        
        res.status(200).json(yeniObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = getCategoriesById;
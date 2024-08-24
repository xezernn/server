const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                Subcategory: {
                    select: {
                        id: true,
                        categoryName: true
                    }
                }
            }
        });

        const formattedCategories = categories.map(category => ({
            id: category.id,
            categoryName: category.categoryName,
            subcategory: category.Subcategory.map(subcat => ({
                id: subcat.id,
                categoryName: subcat.categoryName.toLowerCase()
            }
            ))
        }))

        res.status(200).json(formattedCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = getCategories;
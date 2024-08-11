const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDiscountedProducts = async (req, res) => {
    try {
        const discountedProducts = await prisma.product.findMany({
            where: {
                discount: {
                    gt: 0  
                }
            },
            orderBy: {
                discount: 'desc'  
            },
            take: 20 
        });
        res.status(200).json(discountedProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getDiscountedProducts
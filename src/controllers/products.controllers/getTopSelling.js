const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTopSellingProducts = async (req, res) => {
    try {
        const topSellingProducts = await prisma.product.findMany({
            where: {
                isTopSelling: true
            },
            take: 20
        });
        res.status(200).json(topSellingProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = getTopSellingProducts
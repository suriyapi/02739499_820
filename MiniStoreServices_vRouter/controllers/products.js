const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    const { product_id, name, description , price, category, image_url } = req.body;
    try {
        const prod = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json(prod);
    } catch (err) {        
        res.status(500).json(err);
    }
};

module.exports = { createProduct };

const Product = require("../models/Product");

class ProductRepository {
    async getAll(page = 1, limit = 10) {
        const safePage = Math.max(Number(page) || 1, 1);

        const safeLimit = Math.min(
            Math.max(Number(limit) || 10, 1),
            50
        );

        const skip = (safePage - 1) * safeLimit;

        return await Product.find({}, "-__v")
            .skip(skip)
            .limit(safeLimit);
    }

    async getById(id) {
        return await Product.findById(id);
    }

    async create(data) {
        return await Product.create(data);
    }

    async update(id, data) {
        const product = await Product.findById(id);

        if (!product) {
            return null;
        }

        Object.assign(product, data);

        return await product.save();
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductRepository();
const productRepository = require("../repositories/product.repository");
const { PRODUCT_STATUS } = require("../constants");

class ProductService {
    async getAllProducts() {
        const products = await productRepository.getAll();

       
    return products.filter(
    product =>
        product.status === PRODUCT_STATUS.AVAILABLE &&
        product.stock > 0
);
    }
    async getProductById(id) {
        return await productRepository.getById(id);
    }

    async createProduct(data) {

    if (!data.name || data.price === undefined) {
        throw new Error("El nombre y el precio son obligatorios");
    }

    return await productRepository.create({
        ...data,
        status: PRODUCT_STATUS.AVAILABLE
    });
}

    async updateProduct(id, data) {
        return await productRepository.update(id, data);
    }

    async deleteProduct(id) {
        return await productRepository.delete(id);
    }
}

module.exports = new ProductService();
const productRepository = require("../repositories/product.repository");

const { PRODUCT_STATUS } = require("../constants");

const {
    InvalidProductDataError,
    ProductNotFoundError
} = require("../errors/domain.errors");

class ProductService {
    async getAllProducts(page, limit) {
        const products = await productRepository.getAll(page, limit);

        return products.filter(
            (product) =>
                product.status === PRODUCT_STATUS.AVAILABLE &&
                product.stock > 0
        );
    }

    async getProductById(id) {
        const product = await productRepository.getById(id);

        if (!product) {
            throw new ProductNotFoundError();
        }

        return product;
    }

    async createProduct(data) {
        if (!data.name || data.price === undefined) {
            throw new InvalidProductDataError();
        }

        return await productRepository.create({
            ...data,
            status: PRODUCT_STATUS.AVAILABLE
        });
    }

    async updateProduct(id, data) {
        const updatedProduct = await productRepository.update(id, data);

        if (!updatedProduct) {
            throw new ProductNotFoundError();
        }

        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await productRepository.delete(id);

        if (!deletedProduct) {
            throw new ProductNotFoundError();
        }

        return deletedProduct;
    }
}

module.exports = new ProductService();
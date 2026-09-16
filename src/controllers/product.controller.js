const productService = require("../services/product.service");

class ProductController {
    async getAll(req, res, next) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const products = await productService.getAllProducts(
                page,
                limit
            );

            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const product = await productService.getProductById(id);

            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const product = await productService.createProduct(req.body);

            return res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;

            const product = await productService.updateProduct(
                id,
                req.body
            );

            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await productService.deleteProduct(id);

            return res.status(200).json({
                message: "Producto eliminado"
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
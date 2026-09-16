const userService = require("../services/user.service");
const deliveryService = require("../services/delivery.service");
const logger = require("../config/logger");
const { FileRequiredError } = require("../errors/domain.errors");

class FileController {
    async uploadUserDocument(req, res, next) {
        try {
            if (!req.file) {
                throw new FileRequiredError();
            }

            const documentData = {
                originalName: req.file.originalname,
                generatedName: req.file.filename,
                path: req.file.path,
                mimeType: req.file.mimetype,
                size: req.file.size,
                documentType: req.body.documentType,
            };

            const user = await userService.addDocument(
                req.params.userId,
                documentData
            );

            logger.info(
                `Documento cargado correctamente para el usuario ${req.params.userId}`
            );

            const safeUser = user.toObject();

            if (safeUser.documents) {
                safeUser.documents = safeUser.documents.map((document) => {
                    const safeDocument = { ...document };
                    delete safeDocument.path;
                    return safeDocument;
                });
            }

            res.status(201).json({
                status: "success",
                message: "Documento cargado correctamente",
                user: safeUser,
            });
        } catch (error) {
            logger.warning(
                `Error al cargar documento para el usuario ${req.params.userId}: ${error.message}`
            );

            next(error);
        }
    }

    async uploadDeliveryReceipt(req, res, next) {
        try {
            if (!req.file) {
                throw new FileRequiredError();
            }

            const receiptData = {
                originalName: req.file.originalname,
                generatedName: req.file.filename,
                path: req.file.path,
                mimeType: req.file.mimetype,
                size: req.file.size,
            };

            const delivery = await deliveryService.addReceipt(
                req.params.deliveryId,
                receiptData
            );

            logger.info(
                `Comprobante asociado correctamente a la entrega ${req.params.deliveryId}`
            );

            const safeDelivery = delivery.toObject();

            if (safeDelivery.receipt) {
                delete safeDelivery.receipt.path;
            }

            res.status(200).json({
                status: "success",
                message: "Comprobante cargado correctamente",
                delivery: safeDelivery,
            });
        } catch (error) {
            logger.warning(
                `Error al cargar comprobante para la entrega ${req.params.deliveryId}: ${error.message}`
            );

            next(error);
        }
    }
}

module.exports = new FileController();
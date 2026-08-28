const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(process.cwd(), "uploads");

const usersDir = path.join(uploadDir, "users");
const deliveriesDir = path.join(uploadDir, "deliveries");

fs.mkdirSync(usersDir, { recursive: true });
fs.mkdirSync(deliveriesDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "document") {
      cb(null, usersDir);
      return;
    }

    if (file.fieldname === "receipt") {
      cb(null, deliveriesDir);
      return;
    }

    cb(new Error("Campo de archivo no permitido"));
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

    cb(null, uniqueName);
  },
});

const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Tipo de archivo no permitido"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = {
  upload,
  allowedMimeTypes,
};
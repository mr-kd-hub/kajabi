//multer specific middleware
const multer = require("multer");
const path = require("path");
const thumbnailMiddleware = multer({
  dest: "./thumbnails",
  limits: {
    fileSize: 5000000, //1mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPEG|JPG|PNG)$/)) {
      return cb(new Error("Not Valide Formate..."));
    }
    cb(undefined, true);
  },
});
module.exports = thumbnailMiddleware;

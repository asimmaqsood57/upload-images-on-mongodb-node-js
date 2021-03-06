const util = require("util");

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
var storage = new GridFsStorage({
  url: "mongodb://localhost:27017/uploadFilesDB",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const fileName = `${Date.now()}-bezkoder-${file.originalname}`;
      return fileName;
    }

    return {
      bucketName: "photos",
      fileName: `${Date.now()}-bezkoder-${file.originalname}`,
    };
  },
});

const uploadFiles = multer({ storage: storage }).array("multi-files", 10);

const uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;

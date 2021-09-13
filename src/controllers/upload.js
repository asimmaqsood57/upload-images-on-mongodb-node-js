const upload = require("../middlewares/upload");

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log("controllers upload.js", req.files);

    if (req.files.length <= 0) {
      return res.send("You must have to select one file atleast");
    }

    return res.send("files  has been uploaded");
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("too many files to upload");
    }

    return res.send("Error in file uploading", error);
  }
};

module.exports = {
  uploadFiles: uploadFiles,
};

const { cloudinary } = require("../config/cloudinary");


exports.uploadToCloudinary = (buffer,folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};

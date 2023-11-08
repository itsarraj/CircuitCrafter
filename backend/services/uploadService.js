import cloudinaryv2 from "../util/cloudinary.js";

// This is for local file path or image buffer (that has already taken care in last file) where images are uploaded

const uploadProductImage = async (fileStr, name) => {
  try {
    const { url } = await cloudinaryv2.uploader.upload(fileStr, {
      public_id: name,
      use_filename: true,
      folder: process.env.CLOUDINARY_CLOUD_FOLDER_NAME,
    });
    return url;
  } catch (err) {
    console.log(err);
  }
};

export { uploadProductImage };

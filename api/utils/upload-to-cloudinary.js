const cloudinary = require('../config/cloudinary.config');

const uplaodToCloudinary = (file) => {
	return new Promise((resolve, reject) => {
	  cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
		if (result) {
		  resolve(result);
		} else {
		  reject(error);
		}
	  }).end(file.buffer);
	});
  }

module.exports = uplaodToCloudinary;
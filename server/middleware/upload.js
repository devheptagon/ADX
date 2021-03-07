const multer = require("multer");
const slug = require("../middleware/slug");
const sharp = require('sharp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, callback) => {
    const mediaType = ["image/png", "image/jpeg"];
    if (mediaType.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }
    const filename = `${Date.now()}-${slug(file.originalname.split(".").slice(0)[0])}.${file.originalname.split(".").slice(-1)}`;
    callback(null, filename);
  }
});
exports.upload = multer({ storage: storage }).array("mediaFiles", 20);

/**
 * @param {*} filename
 * @param {*} destination
 * @param {*} sizeX16 (1600 x 900)
 * @param {*} sizeX8 (800 x 450)
 * @param {*} sizeX2 (192 x 108)
 */
exports.processMedia = async function (file, filename) {
  const destination = process.cwd() + '/public/uploads/';
  const watermarkLarge = process.cwd() + '/public/images/logo-watermark-large.png';
  const watermarkMedium = process.cwd() + '/public/images/logo-watermark-medium.png';
  const watermarkSmall = process.cwd() + '/public/images/logo-watermark-small.png';
  const sizeXlarge = {
    options: {
      fit: "contain",
      background: "rgb(255,255,255)",
      width: 1600,
      height: 900
    },
    slug: "-large.jpg",
    watermark: watermarkLarge
  };
  const sizeXmedium = {
    options: {
      fit: "contain",
      background: "rgb(255,255,255)",
      width: 800,
      height: 450
    },
    slug: "-medium.jpg",
    watermark: watermarkMedium
  };
  const sizeXsmall = {
    options: {
      fit: "contain",
      background: "rgb(255,255,255)",
      width: 192,
      height: 108
    },
    slug: "-small.jpg",
    watermark: watermarkSmall
  };

  await sharp(destination + file)
    .resize(sizeXlarge.options)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .composite([{ input: sizeXlarge.watermark, gravity: 'centre' }])
    .toFile(destination + filename + sizeXlarge.slug);
  await sharp(destination + file)
    .resize(sizeXmedium.options)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .composite([{ input: sizeXmedium.watermark, gravity: 'centre' }])
    .toFile(destination + filename + sizeXmedium.slug);
  await sharp(destination + file)
    .resize(sizeXsmall.options)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .composite([{ input: sizeXsmall.watermark, gravity: 'centre' }])
    .toFile(destination + filename + sizeXsmall.slug);
}
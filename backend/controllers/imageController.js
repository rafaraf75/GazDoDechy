const cloudinary = require('../config/cloudinaryConfig');
const { v4: uuidv4 } = require('uuid');

// Cloudinary potrzebuje danych w formacie base64 lub bufora
exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Brak pliku' });
    }

    // Generuj nazwę unikalną
    const fileName = `${uuidv4()}-${file.originalname}`;

    // W zależności od typu — wybierz folder
    const folder = req.body.folder || 'ads';

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: fileName,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(file.buffer);
    });

    return res.status(200).json({
      message: 'Plik zapisany w Cloudinary',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Błąd przy uploadzie:', error);
    return res.status(500).json({ message: 'Błąd serwera' });
  }
};

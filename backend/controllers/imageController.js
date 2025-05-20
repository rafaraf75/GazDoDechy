const cloudinary = require('../config/cloudinaryConfig');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Cloudinary potrzebuje danych w formacie base64 lub bufora
exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Brak pliku' });
    }

    const baseName = path.basename(file.originalname, path.extname(file.originalname));
    const fileName = `${uuidv4()}-${baseName}`;

    // Wybierz folder (np. "ads")
    const folder = req.body.folder || 'ads';

    // Upload do Cloudinary z użyciem streamu
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

    // Zwróć dane o zdjęciu
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

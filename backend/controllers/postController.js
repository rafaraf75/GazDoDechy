const { supabaseAdmin } = require('../supabaseClient');
const cloudinary = require('../config/cloudinaryConfig');

// POST /api/posts
exports.createPost = async (req, res) => {
  const { description, user_id } = req.body;
  const files = req.files || [];

  try {
    if (!user_id || !description) {
      return res.status(400).json({ message: 'Brakuje opisu lub ID użytkownika' });
    }

    // Upload zdjęć do Cloudinary z buffer
    const uploads = await Promise.all(
      files.map(async (file) => {
        const base64 = file.buffer.toString('base64');
        const dataUri = `data:${file.mimetype};base64,${base64}`;
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: 'vehicles'
        });
        return {
          url: result.secure_url,
          public_id: result.public_id
        };
      })
    );

    // Utwórz post w Supabase
    const { data: post, error: postErr } = await supabaseAdmin
      .from('posts')
      .insert([{ description, user_id }])
      .select()
      .single();

    if (postErr) throw postErr;

    // Dodaj zdjęcia do post_images
    const imageInserts = uploads.map(img => ({
      post_id: post.id,
      url: img.url,
      public_id: img.public_id
    }));

    const { error: imageErr } = await supabaseAdmin
      .from('post_images')
      .insert(imageInserts);

    if (imageErr) throw imageErr;

    res.status(201).json({ message: 'Post utworzony', post });
  } catch (err) {
    console.error('Błąd tworzenia posta:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/posts
exports.getAllPosts = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        users: user_id (username, profilePicture),
        post_images (url)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Błąd pobierania postów:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

/**
 * Vercel Serverless Function: /api/health
 * Cek cepat apakah environment variable & koneksi MongoDB sudah benar.
 * Buka https://domain-anda.vercel.app/api/health setelah deploy untuk verifikasi.
 */
const { getStateCollection } = require('./_db');

module.exports = async function handler(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ ok: false, error: 'MONGODB_URI belum diset di environment variables Vercel.' });
  }
  try {
    const col = await getStateCollection();
    await col.findOne({}, { projection: { _id: 1 } });
    return res.status(200).json({ ok: true, mongo: 'connected' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/**
 * Vercel Serverless Function: /api/state
 *
 *   GET  /api/state -> ambil seluruh data { karyawan, jabatan, log, slotConfig }
 *   PUT  /api/state -> timpa (upsert) seluruh data ke MongoDB
 *
 * File di folder /api otomatis menjadi endpoint HTTP di Vercel
 * (nama file = path endpoint), tidak perlu konfigurasi routing tambahan.
 */
const { getStateCollection } = require('./_db');

const DEFAULT_STATE = { karyawan: [], jabatan: [], log: [], slotConfig: {}, lembur: [], lemburSbuConfig: {}, tiketHPI: 0, laptop: [] };

// Guard opsional: kalau env API_KEY diisi, wajib kirim header x-api-key yang sama.
function checkApiKey(req, res) {
  const API_KEY = process.env.API_KEY || '';
  if (!API_KEY) return true;
  if (req.headers['x-api-key'] === API_KEY) return true;
  res.status(401).json({ error: 'unauthorized', message: 'Header x-api-key tidak valid atau tidak ada.' });
  return false;
}

module.exports = async function handler(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'config_error', message: 'MONGODB_URI belum diset di environment variables Vercel.' });
  }
  if (!checkApiKey(req, res)) return;

  try {
    const col = await getStateCollection();

    if (req.method === 'GET') {
      const doc = await col.findOne({ _id: 'main' });
      return res.status(200).json(doc || DEFAULT_STATE);
    }

    if (req.method === 'PUT') {
      // Vercel otomatis mem-parse JSON body ke req.body saat Content-Type: application/json
      // ✅ BARU: lembur, lemburSbuConfig, tiketHPI — data Lembur & SPPD Karyawan + config Dashboard Non PO
      // ✅ BARU: laptop — data Monitoring Pengadaan Laptop
      const { karyawan, jabatan, log, slotConfig, lembur, lemburSbuConfig, tiketHPI, laptop } = req.body || {};

      if (!Array.isArray(karyawan) || !Array.isArray(jabatan) || !Array.isArray(log)) {
        return res.status(400).json({ error: 'invalid_payload', message: 'karyawan, jabatan, dan log harus berupa array.' });
      }

      await col.updateOne(
        { _id: 'main' },
        { $set: {
            karyawan, jabatan, log, slotConfig: slotConfig || {},
            lembur: Array.isArray(lembur) ? lembur : [],
            lemburSbuConfig: lemburSbuConfig || {},
            tiketHPI: Number(tiketHPI) || 0,
            laptop: Array.isArray(laptop) ? laptop : [],
            updatedAt: new Date()
          } },
        { upsert: true }
      );

      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (err) {
    console.error('api/state error:', err);
    return res.status(500).json({ error: 'server_error', message: err.message });
  }
};

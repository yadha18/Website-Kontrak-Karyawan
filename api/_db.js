/**
 * Koneksi MongoDB yang di-cache lintas invocation Serverless Function.
 * Vercel bisa menggunakan ulang instance function yang sama (warm start),
 * jadi kita simpan promise koneksi di variabel global supaya tidak membuka
 * koneksi baru ke MongoDB di setiap request (yang akan lambat & boros).
 */
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'hris';

if (!MONGODB_URI) {
  // Tidak melempar error di sini supaya file tetap bisa di-import;
  // error yang jelas akan muncul saat request masuk (lihat state.js / health.js).
  console.error('❌ MONGODB_URI belum diset. Tambahkan di Vercel → Project Settings → Environment Variables.');
}

function getClientPromise() {
  if (!global._hrisMongoClientPromise) {
    const client = new MongoClient(MONGODB_URI);
    global._hrisMongoClientPromise = client.connect();
  }
  return global._hrisMongoClientPromise;
}

async function getStateCollection() {
  const client = await getClientPromise();
  const db = client.db(DB_NAME);
  return db.collection('appstate');
}

module.exports = { getStateCollection };

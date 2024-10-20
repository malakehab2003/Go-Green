import dbClient from '../utils/db.js';

export function testDB(req, res) {
  const status = dbClient.isAlive();
  return res.status(200).json({ connection: status });
}
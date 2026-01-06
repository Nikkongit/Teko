import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

function getDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    db = new Database(dbPath);

    // Initialize the database schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS ContactMessage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
  return db;
}

export default getDb;

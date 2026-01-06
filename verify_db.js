const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
const db = new Database(dbPath);

const rows = db.prepare('SELECT * FROM ContactMessage ORDER BY id DESC LIMIT 1').all();
console.log(JSON.stringify(rows, null, 2));

import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '../configs/env.config.js';

const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
    ssl: { rejectUnauthorized: false }
});

// Add error handler so you don't crash on DB drop:
pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
    // Optionally: process.exit(-1);
});

export default pool;

import dotenv from 'dotenv';

dotenv.config();

const {PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, SECRET_KEY} = process.env;

export {PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, SECRET_KEY};
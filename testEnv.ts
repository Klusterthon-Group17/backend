import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_POSTGRES:', process.env.DB_POSTGRES);

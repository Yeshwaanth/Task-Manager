require('dotenv').config();

const requiredEnv = ['PORT', 'MONGO_URI', 'JWT_SECRET'];

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`❌ Missing environment variable: ${key}`);
    }
});

module.exports = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
};

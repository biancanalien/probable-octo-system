import dotenv from 'dotenv';
dotenv.config();

const { env } = process;

const environment = {
    host: env.HOST || 'localhost',
    port: env.PORT || 8000,
    env: env.ENV || 'local',
    mongo: {
        user: env.MONGO_USER,
        pwd: env.MONGO_PASSWORD,
        host: env.MONGO_HOST,
        database: env.MONGO_DATABASE,
    }
};

export default environment;
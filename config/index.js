import dotenv from 'dotenv'


dotenv.config()

export const {
    APP_PORT,
    MONGO_URL,
    TOKEN_SECTET,
}= process.env;

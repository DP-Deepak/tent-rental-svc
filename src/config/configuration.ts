import * as dotenv from 'dotenv';
dotenv.config();
export const envVariable = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_KEY,
  name: process.env.NAME,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
}

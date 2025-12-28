import dotenv from "dotenv";

dotenv.config();

export const environment = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  //   JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  //   ADMIN_SESSION_NAME: process.env.SESSION_NAME,
  //   ADMIN_SESSION_SECRET: process.env.SESSION_SECRET,
  //   ADMIN_PORT: process.env.ADMIN_PORT || 3001,
  //   ACCESS_TKN_SECRET: process.env.ACCESS_TKN_SECRET,
  //   ACCESS_TKN_EXPIRE: process.env.ACCESS_TKN_EXPIRE,
  //   REFRESH_TKN_SECRET: process.env.REFRESH_TKN_SECRET,
  //   REFRESH_TKN_EXPIRE: process.env.REFRESH_TKN_EXPIRE,
};

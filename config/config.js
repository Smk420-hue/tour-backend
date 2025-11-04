import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "tours_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: false, // 👈 disable SSL
    },
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME_TEST || "tours_test_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: false, // 👈 disable SSL
    },
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME_PROD || "tours_prod_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: false, // 👈 disable SSL
    },
  },
};


import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);


db.authenticate()
.then(() =>{
    console.log("Conectado a DB")
}).catch((err) =>{
    console.log("Error al conectar DB",err)
})

export default db
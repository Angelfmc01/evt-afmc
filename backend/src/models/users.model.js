import { DataTypes } from "sequelize";
import db from "../db/db.js";;


const usersModel = db.define("usuarios", {
  idUsuario: {
    type: DataTypes.INTEGER(6),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  idRol: {
    type: DataTypes.INTEGER(2),
    references: {},
  },
  estatus: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
  },
});



export default usersModel
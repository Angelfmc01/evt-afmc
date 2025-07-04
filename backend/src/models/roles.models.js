import { DataTypes } from "sequelize";
import db from "../db/db.js";

const rolesModel = db.define("roles", {
   idRoles : {
    type: DataTypes.INTEGER(2),
    allowNull: false,
    primaryKey: true
   } ,
   nombre: DataTypes.STRING(15),
   allowNull: false
})

export default rolesModel


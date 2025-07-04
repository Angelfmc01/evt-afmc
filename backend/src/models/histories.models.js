import { DataTypes } from "sequelize";
import db from "../db/db.js";

const historiesModel = db.define('historiales',{
    idHistorial: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER(6),
        allowNull: false
    },
    idProducto: {
        type: DataTypes.INTEGER(6),
        allowNull: false
    },
    movimiento: {
        type: DataTypes.ENUM('Entrada','Salida'),
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER(6),
        allowNull: true
    },
},{
  timestamps: false  
})

export default historiesModel
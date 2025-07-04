import { DataTypes } from "sequelize";
import db from "../db/db.js";

const productsModel = db.define("productos", {
    idProducto: {
       type: DataTypes.INTEGER(6),
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
    },
    nombre: {
       type: DataTypes.STRING(50),
       allowNull: false
    },
    precio: {
       type: DataTypes.DECIMAL(16,2),
       allowNull: false
    },
    estatus: {
       type: DataTypes.INTEGER(1),
       allowNull: false
    },
    cantidad: {
       type: DataTypes.INTEGER(6),
       defaultValue: 0,
    }
    
},{
  timestamps: false  
});

export default productsModel

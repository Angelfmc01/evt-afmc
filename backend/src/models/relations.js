import historiesModel from "./histories.models.js";
import usersModel from "./users.model.js";
import rolesModel from "./roles.models.js";
import productsModel from "./products.models.js";


usersModel.belongsTo(rolesModel, { foreignKey: 'idRol' });
rolesModel.hasMany(usersModel, {foreignKey: 'idRol'})

historiesModel.belongsTo(productsModel, {foreignKey: 'idProducto'})
productsModel.hasMany(historiesModel, {foreignKey: 'idProducto'})

historiesModel.belongsTo(usersModel, {foreignKey: 'idUsuario'})
usersModel.hasMany(historiesModel, {foreignKey: 'idUsuario'})

export {historiesModel, usersModel, productsModel, rolesModel}
import historiesModel from "./histories.models.js";
import usersModel from "./users.model.js";
import rolesModel from "./roles.models.js";
import productsModel from "./products.models.js";


usersModel.belongsTo(rolesModel, { foreignKey: 'idRol', as: 'rol' });
rolesModel.hasMany(usersModel, { foreignKey: 'idRol', as: 'usuarios' });

historiesModel.belongsTo(productsModel, { foreignKey: 'idProducto', as: 'producto' });
productsModel.hasMany(historiesModel, { foreignKey: 'idProducto', as: 'historiales' });

historiesModel.belongsTo(usersModel, { foreignKey: 'idUsuario', as: 'usuario' });
usersModel.hasMany(historiesModel, { foreignKey: 'idUsuario', as: 'historiales' });

export {historiesModel, usersModel, productsModel, rolesModel}
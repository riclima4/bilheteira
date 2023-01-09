import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const CartModule = dbInstance.define("cart", {
  idCart: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idTicket: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
export { CartModule };

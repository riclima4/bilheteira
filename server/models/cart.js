import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { TicketModule } from "./tickets.js";
import { UserModel } from "./users.js";

const CartModule = dbInstance.define("cart", {
  idCart: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idTicket: {
    type: Sequelize.INTEGER,
    references: {
      model: TicketModule,
      key: "idTicket",
    },
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  idUser: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "idUser",
    },
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

CartModule.belongsTo(UserModel, { foreignKey: "idUser" });
TicketModule.hasMany(CartModule, { foreignKey: "idTicket" });
export { CartModule };

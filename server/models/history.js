import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { TicketModule } from "./tickets.js";
import { UserModel } from "./users.js";

const HistoryModule = dbInstance.define("history", {
  idHistory: {
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
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  hour: {
    type: Sequelize.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

HistoryModule.belongsTo(TicketModule, { foreignKey: "idTicket" });
HistoryModule.hasMany(UserModel, { foreignKey: "idUser" });
export { HistoryModule };
import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
const TicketModule = dbInstance.define("tickets", {
  idTicket: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  hour: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});
export { TicketModule };

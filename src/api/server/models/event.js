import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const EventModule = dbInstance.define("event", {
  idEvent: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  local: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
export { EventModule };

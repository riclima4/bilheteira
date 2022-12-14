import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { EventModule } from "./event.js";

const TicketModule = dbInstance.define("tickets", {
  idTicket: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idEvent: {
    type: Sequelize.INTEGER,
    references: {
      model: EventModule,
      key: "idEvent",
    },
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: Sequelize.STRING(50),
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
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});
TicketModule.belongsTo(EventModule, { foreignKey: "idEvent" });
export { TicketModule };

import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const UserModel = dbInstance.define("users", {
  idUser: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});
export { UserModel };

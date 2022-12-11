import Router from "express";
import { TicketModule } from "../models/tickets.js";
import { UserModel } from "../models/users.js";

const routes = Router();

routes.get("/hello", (req, res) => {
  res.send("Hello World");
});
routes.get("/users", async (req, res) => {
  const users = await UserModel.findAll();

  res.send({ users });
});
routes.get("/tickets", async (req, res) => {
  const tickets = await TicketModule.findAll();

  res.send({ tickets });
});

export { routes };

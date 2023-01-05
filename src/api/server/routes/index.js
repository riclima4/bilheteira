import Router from "express";
import {
  getALLTickets,
  deleteTickets,
  createTicket,
  updateTicket,
  getTicketid,
  getTicketByEvent,
} from "../controllers/tickets.js";
import {
  getALLEvents,
  deleteEvents,
  createEvents,
  updateEvents,
} from "../controllers/events.js";
import {
  deleteUsers,
  getALLUsers,
  getUserid,
  login,
  newUser,
  updateUser,
} from "../controllers/users.js";
import {
  deleteHistory,
  getALLHistory,
  getHistoryid,
  newHistory,
  updateHistory,
} from "../controllers/history.js";
import { authRequired } from "../utils/jwt.js";

const routes = Router();

routes.get("/", authRequired, getALLUsers);

routes.get("/users", getALLUsers);
routes.get("/user/:id", getUserid);
routes.post("/newUser", newUser);
routes.put("/updateUser/:id", updateUser);
routes.delete("/deleteUser/:id", deleteUsers);

routes.get("/tickets", getALLTickets);
routes.get("/tickets/:id", getTicketid);
routes.get("/ticket/event/:idEvent", getTicketByEvent);
routes.delete("/deleteTickets/:idTicket", deleteTickets);
routes.post("/createTicket", createTicket);
routes.put("/updateTicket/:idTicket", updateTicket);

routes.get("/events", getALLEvents);
routes.delete("/deleteEvents/:idEvent", deleteEvents);
routes.post("/createEvent", createEvents);
routes.put("/updateEvents/:idEvent", updateEvents);

routes.get("/history", getALLHistory);
routes.get("/history/:idHistory", getHistoryid);
routes.delete("/createHistory", newHistory);
routes.post("/updaeHistory/:idHistory", updateHistory);
routes.put("/deleteHistory/:idHistory", deleteHistory);

routes.post("/auth", login);
export { routes };

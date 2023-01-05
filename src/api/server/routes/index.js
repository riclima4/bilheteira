import Router from "express";
import {
  getALLTickets,
  deleteTickets,
  createTicket,
  updateTicket,
} from "../controllers/tickets.js";
import {
  getALLEvents,
  deleteEvents,
  createEvents,
  updateEvents,
  getEventByID,
} from "../controllers/events.js";
import { getALLUsers, login } from "../controllers/users.js";
import { authRequired } from "../utils/jwt.js";

const routes = Router();

routes.get("/", authRequired, getALLUsers);
routes.get("/users", getALLUsers);

routes.get("/tickets", getALLTickets);
routes.delete("/deleteTickets/:idTicket", deleteTickets);
routes.put("/createTicket", createTicket);
routes.put("/updateTicket/:idTicket", updateTicket);

routes.get("/events", getALLEvents);
routes.get("/event/:idEvent", getEventByID);
routes.delete("/deleteEvents/:idEvent", deleteEvents);
routes.put("/createEvent", createEvents);
routes.put("/updateEvents/:idEvent", updateEvents);

routes.post("/auth", login);
export { routes };

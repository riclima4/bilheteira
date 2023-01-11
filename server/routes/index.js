import Router from "express";
// import { userRoutes } from "./users.js";
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
  getEventByID,
  getEventsAvailable,
} from "../controllers/events.js";
import {
  deleteUsers,
  getALLUsers,
  getUserEmail,
  getUserid,
  login,
  newUser,
  updateUser,
} from "../controllers/users.js";
import {
  deleteHistory,
  getALLHistory,
  getHistoryUserID,
  newHistory,
  updateHistory,
} from "../controllers/history.js";
import { authRequired } from "../utils/jwt.js";
import {
  addNewCartItem,
  getALLCart,
  getALLCartbyUser,
} from "../controllers/cart.js";

const routes = Router();

routes.get("/", authRequired, getALLUsers);

routes.get("/users", getALLUsers);
routes.get("/user/:id", getUserid);
routes.get("/user/:email", getUserEmail);
routes.post("/newUser", newUser);
routes.post("/updateUser/:id", updateUser);
routes.delete("/deleteUser/:id", deleteUsers);

// routes.use("/users", userRoutes);

routes.get("/tickets", getALLTickets);
routes.get("/tickets/:idTicket", getTicketid);
routes.get("/ticket/event/:idEvent", getTicketByEvent);
routes.get("/ticketsByEventAdmin/:idEvent", getTicketByEvent);
routes.delete("/deleteTickets/:idTicket", deleteTickets);
routes.post("/createTicket", createTicket);
routes.post("/updateTicket/:idTicket", updateTicket);

routes.get("/events", getALLEvents);
routes.get("/eventsAvailable", getEventsAvailable);
routes.get("/event/:idEvent", getEventByID);
routes.delete("/deleteEvents/:idEvent", deleteEvents);
routes.post("/createEvent", createEvents);
routes.post("/updateEvents/:idEvent", updateEvents);

routes.get("/history", getALLHistory);
routes.get("/history/:idUser", getHistoryUserID);
routes.delete("/createHistory", newHistory);
routes.post("/updateHistory/:id", updateHistory);
routes.put("/deleteHistory/:id", deleteHistory);

routes.get("/cart", getALLCart);
routes.get("/userCart/:idUser", getALLCartbyUser);
routes.post("/newCart/:idEvent", addNewCartItem);

routes.post("/auth", login);
export { routes };

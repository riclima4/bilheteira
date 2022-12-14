import Router from "express";
import { getALLEvents } from "../controllers/events.js";
import { getALLTickets } from "../controllers/tickets.js";
import { getALLUsers, login } from "../controllers/users.js";
import { authRequired } from "../utils/jwt.js";

const routes = Router();

routes.get("/", authRequired, getALLUsers);
routes.get("/users", getALLUsers);

routes.get("/tickets", getALLTickets);
routes.get("/events", getALLEvents);

routes.post("/auth", login);
export { routes };

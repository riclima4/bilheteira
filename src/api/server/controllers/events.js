import { EventModule } from "../models/event.js";

export const getALLEvents = async (req, res) => {
  const events = await EventModule.findAll();

  return res.send(events);
};

import { HistoryModule } from "../models/history.js";

export const getALLHistory = async (req, res) => {
  const History = await HistoryModule.findAll();

  return res.send(events);
};

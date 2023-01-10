import { HistoryModule } from "../models/history.js";

export const getALLHistory = async (req, res) => {
  const History = await HistoryModule.findAll();

  return res.send(History);
};
export const getHistoryUserID = async (req, res) => {
  const idUser = req.params.idUser;
  const historico = await HistoryModule.findAll({ where: { idUser: idUser } });
  if (historico === null) {
    res.send("Não existe User com id: " + idUser);
  }
  res.send(historico);
};

export const newHistory = async (req, res) => {
  const newHistory = {
    idTicket: req.body.idTicket,
    idUser: req.body.idUser,
    data: req.body.data,
    hour: req.body.hour,
  };
  await HistoryModule.create(newHistory);

  res.send({ newHistory });
};

export const updateHistory = async (req, res) => {
  const idHistory = req.params.idHistory;
  const userUpdated = {
    idTicket: req.body.idTicket,
    idUser: req.body.idUser,
    data: req.body.data,
    hour: req.body.hour,
  };
  const history = await HistoryModule.findByPk(idHistory);
  if (history !== null) {
    history.update(historyrUpdated);
    return res.send("history Updated");
  } else {
    return res.send("Não existe history com id: " + idHistory);
  }
};

export const deleteHistory = async (req, res) => {
  const idHistory = req.params.idHistory;
  const history = await HistoryModule.findByPk(idHistory);
  if (history !== null) {
    history.destroy({ where: { idHistory: idHistory } });
    return res.send("history  Deleted");
  } else {
    return res.send("Não existe history com id: " + idHistory);
  }
};

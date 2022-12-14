import { EventModule } from "../models/event.js";

export const getALLEvents = async (req, res) => {
  const events = await EventModule.findAll();

  return res.send(events);
};

export const deleteEvents = async (req, res) => {
  const idEvent = req.params.idEvent;
  const events = await EventModule.findByPk(idEvent);
  if (events !== null) {
    events.destroy({ where: { idEvent: idEvent } });
    return res.send("Evento Apagado");
  } else {
    return res.send("Não existe um Evento com id:" + idEvent);
  }
};

export const createEvents = async (req, res) => {
  const newEvent = {
    title: req.body.title,
    local: req.body.local,
    desc: req.body.desc,
    date: req.body.date,
    type: req.body.type,
  };
  await EventModule.create(newEvent);
  res.send({ newEvent });
};

export const updateEvents = async (req, res) => {
  const idEvent = req.params.idEvent;
  const eventUpdated = {
    title: req.body.title,
    local: req.body.local,
    desc: req.body.desc,
    date: req.body.date,
    type: req.body.type,
  };
  const events = await EventModule.findByPk(idEvent);
  if (events !== null) {
    events.update(eventUpdated);
    return res.send("Event Updated");
  } else {
    return res.send("Não existe Event com id: " + idEvent);
  }
};

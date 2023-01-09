import { EventModule } from "../models/event.js";

export const getALLEvents = async (req, res) => {
  const events = await EventModule.findAll();

  return res.send(events);
};
export const getEventsAvailable = async (req, res) => {
  const events = await EventModule.findAll({ where: { availability: true } });

  return res.send(events);
};
export const getEventByID = async (req, res) => {
  const idEvent = req.params.idEvent;
  const events = await EventModule.findByPk(idEvent);

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
    sessoes: req.body.sessoes,
    desc: req.body.desc,
    date: req.body.date,
    type: req.body.type,
    availability: req.body.availability,
  };
  await EventModule.create(newEvent);
  res.redirect("http://localhost:5500/account/");
};

export const updateEvents = async (req, res) => {
  const idEvent = req.params.idEvent;
  const eventUpdated = {
    title: req.body.title,
    local: req.body.local,
    sessoes: req.body.sessoes,
    desc: req.body.desc,
    date: req.body.date,
    type: req.body.type,
    availability: req.body.availability,
  };
  const events = await EventModule.findByPk(idEvent);
  if (events !== null) {
    events.update(eventUpdated);
    return res.redirect("http://localhost:5500/account/");
  } else {
    return res.send("Não existe Event com id: " + idEvent);
  }
};

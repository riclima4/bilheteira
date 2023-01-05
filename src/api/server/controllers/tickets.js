import { where } from "sequelize";
import { TicketModule } from "../models/tickets.js";

export const getALLTickets = async (req, res) => {
  const tickets = await TicketModule.findAll();

  return res.send({ tickets });
};

export const getTicketid = async (req, res) => {
  const idTicket = req.params.idTicket;
  const tickets = await TicketModule.findByPk(idTicket);
  if (tickets === null) {
    res.send("Não existe tickets com id: " + idTicket);
  }
  res.send({ tickets });
};

export const getTicketByEvent = async (req, res) => {
  const idEvent = req.params.idEvent;
  const tickets = await TicketModule.findAll({
    where: {
      idEvent: idEvent,
    },
  });
  if (tickets === null) {
    res.send("Não existe tickets com id: " + idEvent);
  }
  res.send({ tickets });
};

export const deleteTickets = async (req, res) => {
  const idTicket = req.params.idTicket;
  const ticket = await TicketModule.findByPk(idTicket);
  if (ticket !== null) {
    ticket.destroy({ where: { idTicket: idTicket } });
    return res.send("Tickets Apagado");
  } else {
    return res.send("Não existe um Ticket com id:" + idTicket);
  }
};

export const createTicket = async (req, res) => {
  const newTicket = {
    title: req.body.title,
    date: req.body.date,
    hour: req.body.hour,
    price: req.body.price,
    availability: req.body.availability,
  };
  await TicketModule.create(newTicket);
  res.send({ newTicket });
};

export const updateTicket = async (req, res) => {
  const idTicket = req.params.idTicket;
  const ticketUpdated = {
    title: req.body.title,
    date: req.body.date,
    hour: req.body.hour,
    price: req.body.price,
    availability: req.body.availability,
  };
  const ticket = await TicketModule.findByPk(idTicket);
  if (ticket !== null) {
    ticket.update(ticketUpdated);
    return res.send("Ticket  Updated");
  } else {
    return res.send("Não existe Ticket com id: " + idTicket);
  }
};

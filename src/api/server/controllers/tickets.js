import { TicketModule } from "../models/tickets.js";

export const getALLTickets = async (req, res) => {
    const tickets = await TicketModule.findAll();

    return res.send({ users });
};


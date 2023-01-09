import { CartModule } from "../models/cart.js";

export const getALLCart = async (req, res) => {
  const cart = await CartModule.findAll();

  return res.send(cart);
};
export const getALLCartbyUser = async (req, res) => {
  const idUser = req.params.idUser;
  const cart = await CartModule.findAll({ where: { idUser: idUser } });

  return res.send(cart);
};
export const addNewCartItem = async (req, res) => {
  const idEvent = req.params.idEvent;
  const newCartItem = {
    idTicket: req.body.idTicket,
    idUser: 1,
  };
  await CartModule.create(newCartItem);
  res.redirect("http://localhost:5500/event/" + idEvent);
};

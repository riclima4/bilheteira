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
export const getOneCartbyUser = async (req, res) => {
  const idUser = req.params.idUser;
  const cart = await CartModule.findOne({ where: { idUser: idUser } });

  return res.send(cart);
};
export const addNewCartItem = async (req, res) => {
  const idEvent = req.params.idEvent;
  const newCartItem = {
    idTicket: req.body.idTicket,
    idUser: req.body.idUser,
    eventTitle: req.body.eventTitle,
    ticketTitle: req.body.ticketTitle,
    ticketDate: req.body.ticketDate,
    ticketPrice: req.body.ticketPrice,
  };
  await CartModule.create(newCartItem);
  res.redirect("http://localhost:5500/event/" + idEvent);
};
export const deleteCartItem = async (req, res) => {
  const idCart = req.params.idCart;
  const cart = await CartModule.findByPk(idCart);
  if (cart !== null) {
    cart.destroy({ where: { idCart: idCart } });
    res.send("Deleted Cart Item");
  } else {
    return res.send("Não existe um Cart com id:" + idCart);
  }
};
export const deleteAllCart = async (req, res) => {
  const idUser = req.params.idUser;
  const cart = await CartModule.findAll({ where: { idUser: idUser } });

  if (cart !== null) {
    cart.forEach((item) => {
      item.destroy();
    });
    res.send("deu");
  } else {
    return res.send("Não existe um user com id:" + idUser);
  }
};

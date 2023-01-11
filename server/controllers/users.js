import { createToken } from "../utils/jwt.js";
import { UserModel } from "../models/users.js";
import { HistoryModule } from "../models/history.js";
import { CartModule } from "../models/cart.js";

export const getALLUsers = async (req, res) => {
  const users = await UserModel.findAll();
  return res.send(users);
};

export const getUserid = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findByPk(id);
  if (user === null) {
    res.send("Não existe User com id: " + id);
  }
  res.send({ user });
};

export const getUserEmail = async (req, res) => {
  const email = req.params.email;
  const user = await UserModel.findAll(email);
  if (user === null) {
    res.send("Não existe User com email: " + email);
  }
  res.send({ user });
};

export const newUser = async (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  const asd = await UserModel.create(newUser);
  const { password, ...user } = asd.dataValues;

  const token = createToken(user);

  res.send(token);
};
export const newUserPage = async (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  const asd = await UserModel.create(newUser);
  const { password, ...user } = asd.dataValues;

  const token = createToken(user);

  res.redirect("http://localhost:5500/account/");
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const userUpdated = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type,
  };
  const user = await UserModel.findByPk(id);
  if (user !== null) {
    user.update(userUpdated);
    return res.redirect("http://localhost:5500/account/");
  } else {
    return res.send("Não existe User com id: " + id);
  }
};

export const deleteUsers = async (req, res) => {
  const idUser = req.params.id;
  const user = await UserModel.findByPk(idUser);
  const cart = await CartModule.findAll({ where: { idUser: idUser } });
  const userHistory = await HistoryModule.findAll({
    where: { idUser: idUser },
  });
  if (cart !== null) {
    cart.forEach((item) => {
      item.destroy({ where: { idUser: idUser } });
    });
  }
  if (userHistory !== null) {
    userHistory.forEach((item) => {
      item.destroy({ where: { idUser: idUser } });
    });
  }

  setTimeout(() => {
    if (user !== null) {
      user.destroy({ where: { idUser: idUser } });
      res.send("Funfa");
    } else {
      res.send("Não existe User com id: " + idUser);
    }
  }, 2000);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await UserModel.findOne({ where: { email, password } });

  if (!userWithEmail)
    return res.status(400).json({ message: "Email or password errados" });

  const { password: tfvgybhn, ...user } = userWithEmail.dataValues;

  const token = createToken(user);
  res.json({ token });
};

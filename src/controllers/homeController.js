const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  updataUserById,
  deleteUserById,
} = require("../services/CRUDService");
const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUsers: results });
};
const getAbc = (req, res) => {
  res.send(" Check ABC");
};
const getThanhDat = (req, res) => {
  res.send(" Hello , i am Thanh Dat");
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  let [results, fields] = await connection.query(
    `INSERT INTO Users (email, name, city) VALUES (?,?,?)`,
    [email, name, city]
  );
  res.send("created user succeed !");
  // const [results, fields] = await connection.query("select * from Users u");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;

  await updataUserById(email, city, name, userId);
  // res.send("Updated user succeed !");
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
  let userId = req.body.userId;
  await deleteUserById(userId);
  res.redirect("/");
};

module.exports = {
  getHomepage,
  getAbc,
  getThanhDat,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};

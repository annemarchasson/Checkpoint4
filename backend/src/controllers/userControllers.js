const models = require("../models");

// Contrôleur pour récupérer tous les utilisateurs
const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Contrôleur pour récupérer un utilisateur par son ID
const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Contrôleur pour mettre à jour un utilisateur
const edit = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then((result) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Contrôleur pour ajouter un nouvel utilisateur
const add = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then((result) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Contrôleur pour supprimer un utilisateur
const destroy = (req, res) => {
  const userId = req.params.id;
  models.user
    .delete(userId)
    .then((result) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByUsernameWithPasswordAndPassToNext = (req, res, next) => {
  models.user
    .findByUsernameWithPassword(req.body.username)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const [foundUser] = rows;

        req.user = foundUser;

        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByUsernameWithPasswordAndPassToNext,
};

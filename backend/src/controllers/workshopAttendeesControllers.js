const models = require("../models");

const browse = (req, res) => {
  models.workshop_attendees
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// Méthode pour l'inscription à un atelier
const signupForWorkshop = (req, res) => {
  const attendees = req.body;

  models.workshop_attendees
    .create(attendees)
    .then((result) => {
      res.location(`/attendees/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.workshop_attendees
    .delete(req.params.id)
    .then(([result]) => {
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
module.exports = {
  browse,
  signupForWorkshop,
  destroy,
};

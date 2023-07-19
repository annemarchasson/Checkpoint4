const models = require("../models");

// Contrôleur pour afficher tous les ateliers du dimanche
const browse = (req, res) => {
  models.sunday_workshops
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Contrôleur pour afficher un atelier du dimanche par son ID
const read = (req, res) => {
  const workshopId = req.params.id;
  models.sunday_workshops
    .find(workshopId)
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
// Contrôleur pour mettre à jour un atelier du dimanche
const edit = (req, res) => {
  const sundayworkshops = req.body;
  sundayworkshops.id = parseInt(req.params.id, 10);

  models.sunday_workshops
    .update(sundayworkshops)
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

// Contrôleur pour ajouter un nouvel atelier du dimanche
const add = (req, res) => {
  const workshop = req.body;

  models.sunday_workshops
    .insert(workshop)
    .then((result) => {
      res.location(`/workshops/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Contrôleur pour supprimer un atelier du dimanche
const destroy = (req, res) => {
  const workshopId = req.params.id;
  models.sunday_workshops
    .delete(workshopId)
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
// Méthode pour l'inscription à un atelier
const signupForWorkshop = (req, res) => {
  const userId = req.user.id; // ID de l'utilisateur connecté
  const workshopId = req.params.id; // ID de l'atelier

  models.sunday_workshops
    .findOne({ where: { id: workshopId } })
    .then((workshop) => {
      if (workshop.currentAttendees < workshop.maxAttendees) {
        models.workshop_attendees
          .create({ userId, workshopId })
          .then(() => {
            workshop.increment("currentAttendees");
            res
              .status(200)
              .json({ message: "Inscription réussie à l'atelier." });
          })
          .catch((err) => {
            console.error(err);
            res.status(500);
          });
      } else {
        res
          .status(400)
          .json({ message: "La capacité maximale de l'atelier est atteinte." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  signupForWorkshop,
};

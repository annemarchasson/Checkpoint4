const express = require("express");

const router = express.Router();

// Import des contrôleurs
const itemControllers = require("./controllers/userControllers");
const userControllers = require("./controllers/userControllers");
const workshopAttendeesControllers = require("./controllers/workshopAttendeesControllers");
const { hashPassword, verifyPassword, sendToken } = require("./services/auth");
const sundayWorkshopControllers = require("./controllers/sundayWorkshopControllers");

// Routes pour items
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// Routes pour les utilisateurs
router.get("/user", userControllers.browse);
// afficher les utilisateurs
router.get("/user/:id", userControllers.read);
// afficher un utilisateur grace à son id
router.put("/user/:id", hashPassword, userControllers.edit);
// modifie un utilisateur grace à son id
router.post("/user", hashPassword, userControllers.add);
// ajouter un utilisateur
router.delete("/user/:id", userControllers.destroy);
// supprimer un utilisateur grace à son id
// ci dessous se connecter/se deconnecter
router.post(
  "/login",
  userControllers.getUserByUsernameWithPasswordAndPassToNext,
  verifyPassword,
  sendToken
);

router.get("/show-token", (req, res) => {
  console.info(req.cookies);

  res.sendStatus(200);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

// Routes pour les ateliers du dimanche
router.get("/workshops", sundayWorkshopControllers.browse);
// affiches les ateliers
router.get("/workshops/:id", sundayWorkshopControllers.read);
// afficher un atelier (avec son id)
router.put("/workshops/:id", sundayWorkshopControllers.edit);
// éditer un atelier avec son id
router.post("/workshops/", sundayWorkshopControllers.add);
// ajouter un atelier
router.delete("/workshops/:id", sundayWorkshopControllers.destroy);
// supprimer un atelier
router.get("/attendees/", workshopAttendeesControllers.browse);
// afficher les inscrits à un atelier
router.post("/attendees/", workshopAttendeesControllers.signupForWorkshop);
// signupForWorkshop : utilisateur s'inscrire à un atelier du dimanche
router.delete("/attendees/:id", workshopAttendeesControllers.destroy);
//   - signupForWorkshop : permet à un utilisateur d'annuler l'inscription à un atelier du dimanche en reactualisant le nombre maximum de participants.

module.exports = router;

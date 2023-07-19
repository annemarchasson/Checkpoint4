const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/userControllers");
// Import des contrôleurs
const userControllers = require("./controllers/userControllers");
const { hashPassword, verifyPassword, sendToken } = require("./services/auth");
const sundayWorkshopControllers = require("./controllers/sundayWorkshopControllers");
// const artworkController = require("./controllers/artworkController");
// const adminController = require("./controllers/adminController");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// Routes pour les utilisateurs
router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put("/user/:id", hashPassword, userControllers.edit);
router.post("/user", hashPassword, userControllers.add);
router.delete("/user/:id", userControllers.destroy);
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

// signin : permet à un utilisateur existant de se connecter avec son email et son mot de passe.

// Routes pour les ateliers du dimanche
router.get("/workshops", sundayWorkshopControllers.browse);
// affiches les ateliers
router.get("/workshops/:id", sundayWorkshopControllers.read);
// afficher un atelier (avec son id)
router.get("/workshops/:id", sundayWorkshopControllers.edit);
// éditer un atelier avec son id
router.post("/workshops/", sundayWorkshopControllers.add);
// ajouter un atelier
router.delete("/workshops/:id", sundayWorkshopControllers.destroy);
// supprimer un atelier
// router.post("/workshops/:id/signup", sundayWorkshopControllers.signupForWorkshop);
//   - signupForWorkshop : permet à un utilisateur de s'inscrire à un atelier du dimanche en respectant et en actualisant le nombre maximum de participants.
// router.delete("/workshops/:id/signup", sundayWorkshopControllers.signoutForWorkshop);
//   - signupForWorkshop : permet à un utilisateur d'annuler l'inscription à un atelier du dimanche en reactualisant le nombre maximum de participants.

module.exports = router;

let express = require("express");
let controller = require("../Controllers/mainController");

const router = express.Router();

router.get("/",controller.index)
router.get("/signup",controller.signup)
router.get("/login",controller.login)
router.post("/login",controller.userLogin)
router.get("/profile",controller.userProfile)
router.post("/profile",controller.profile)
router.post("/removeExercise",controller.removeExercise)
router.get("/logout",controller.logout)
module.exports = router;
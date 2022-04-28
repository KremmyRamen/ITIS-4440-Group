let express = require("express");
let controller = require("../Controllers/exerciseController");

const router = express.Router();

router.get("/",controller.index)
router.get("/allExercises",controller.exercise)
router.post("/allExercises",controller.filterExercise)
router.post("/allExercises/removeFilter",controller.removeFilter)
router.post("/userExercises",controller.userExercises)
router.get("/target",controller.target)
router.get("/name",controller.name)

module.exports = router;
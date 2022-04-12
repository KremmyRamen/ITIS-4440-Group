let express = require("express");
let controller = require("../Controllers/exerciseController");

const router = express.Router();

router.get("/",controller.index)
router.get("/target",controller.target)
router.get("/exercises",controller.exercise)
router.get("/name",controller.name)

module.exports = router;
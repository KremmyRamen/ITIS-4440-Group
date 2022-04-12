let express = require("express");
let controller = require("../Controllers/mainController");

const router = express.Router();

router.get("/",controller.index)
module.exports = router;
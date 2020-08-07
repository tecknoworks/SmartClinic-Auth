var express = require("express");
var router = express.Router();

const UserService = require('../service/UserService');

router.get("/", UserService.get);
router.get("/:id", UserService.getById);
router.post("/post", UserService.post);
router.delete("/:id", UserService.remove);
router.put("/:id", UserService.update);

module.exports = router;
var express = require("express");
var router = express.Router();
const UserService = require('../service/UserService');

router.get("/", UserService.get);
router.get("/:id", UserService.getById);
router.post("/register", UserService.register);
router.get('/confirmation/:token',UserService.confirmaEmail);

router.delete("/:id", UserService.remove);
router.put("/:id", UserService.update);
router.post('/login',UserService.authenticate);
router.post('/forgot', UserService.forgotPassword);
router.get('/confirmPassword/:token', UserService.confirmPassord);

module.exports = router;
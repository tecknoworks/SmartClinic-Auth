var express = require("express");
var router = express.Router();

const AddressService = require('../service/AddressService');

router.get("/", AddressService.get);
router.get("/:id", AddressService.getById);
router.get("/patient/:id", AddressService.getByPatientId);

router.delete("/:id", AddressService.remove);
router.put("/:id", AddressService.update);

module.exports = router;
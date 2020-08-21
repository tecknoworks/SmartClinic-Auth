var express = require("express");
var router = express.Router();

const PatientService = require('../service/PatientService');

router.get("/", PatientService.get);
router.get("/:id", PatientService.getById);
router.get("/patient/:id", PatientService.getByUserId);

router.post("/post", PatientService.post);
router.post("/address", PatientService.addAddress);
router.delete("/:id", PatientService.remove);
router.delete("/address/:patientId/:addressId", PatientService.deleteAddress);

router.put("/:id", PatientService.update);

module.exports = router;
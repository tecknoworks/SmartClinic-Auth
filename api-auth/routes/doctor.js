var express = require("express");
var router = express.Router();

const DoctorSetvice = require('../service/DoctorService');

router.get("/", DoctorSetvice.get);
router.get("/:id", DoctorSetvice.getById);
router.get("/doctor/:id", DoctorSetvice.getByUserId);

router.post("/post", DoctorSetvice.post);
router.delete("/:id", DoctorSetvice.remove);
router.put("/:id", DoctorSetvice.update);

module.exports = router;
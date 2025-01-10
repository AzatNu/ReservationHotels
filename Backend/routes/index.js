const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/hotels", require("./hotel"));
router.use("/reservations", require("./reservation"));
router.use("/rooms", require("./room"));
router.use("/users", require("./user"));

module.exports = router;


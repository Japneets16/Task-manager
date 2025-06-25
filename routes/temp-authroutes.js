const express = require("express");
const { registeruser, loginuser } = require("../controller/temp-userlogic");
const {
  create,
  getalltask,
  getalltask_id,
  updatetask_id,
  delete_id,
} = require("../controller/temp-task");
const router = express.Router();
const auth = require("../middleware/auth");

// Auth routes (no auth middleware needed for these)
router.post("/regis", registeruser);
router.post("/login", loginuser);

// Task routes (with auth middleware)
router.post("/create", auth, create);
router.get("/getalltask", auth, getalltask);
router.get("/getalltask/:id", auth, getalltask_id);
router.post("/update/:id", auth, updatetask_id);
router.post("/delete/:id", auth, delete_id);

module.exports = router;

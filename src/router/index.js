const express = require("express");
const router = express.Router();
// controllers
const userController = require("../controllers/user");


router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);
module.exports = router;
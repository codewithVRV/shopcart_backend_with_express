const express = require('express');

const { pingController, pingAuthCheck } = require('../../controllers/ping_controller');
const { isLoggedIn } = require('../../middlewares/auth_middleware');

const router = express.Router();


router.get('/', pingController); // mapping a route to a controller
router.get("/authping", [isLoggedIn], pingAuthCheck)


module.exports = router;
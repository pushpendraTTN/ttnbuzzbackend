const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth/googleauth')(passport);
const cors = require('cors');
const session = require('express-session')

const app = express();

app.use(cors());

module.exports = router;
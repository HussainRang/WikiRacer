const express = require('express');
const Router = express.Router();
const {get_ladder} = require('../Components/Functions/get_ladder.js');
const {serve_page} = require('../Components/Functions/serve_page.js')

Router.route('/ladder')
.get(serve_page)
.post(get_ladder);

module.exports = Router;
window.OPDashboard = {};

// Require vendor scripts
// window.OPDashboard.alertify = require('alertify.js');
// window.Alertify = require('alertify-webpack');
// console.log(window.OPDashboard.alertify);

try {
    // window.$ = window.jQuery;
    require('bootstrap');
} catch (e) {
    console.error(e);
}

// Global stuff
require('./helpers');
require('./ajax');

// Dashboard scripts
require('./integrations');
require('./settings');
require('./updates');
require('./messages');

import './OP3General'
import './OP3Builder'

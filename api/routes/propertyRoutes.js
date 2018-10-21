'use strict';
module.exports = function (app) {
    var propertyList = require('../controllers/propertyController');

    // Routes
    app.route('/api/htv/completed')
        .post(propertyList.read_completed_workflow);

    app.route('/api/:type/workflow/:workflow')
        .post(propertyList.read_filtered_workflow);
};  
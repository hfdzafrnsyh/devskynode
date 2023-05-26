const { check } = require('express-validator');

const ActivitySchema = [

    check('title').isString().withMessage('title cannot be null'),
    check('activity_group_id').isInt().withMessage('activity_group_id cannot be null'),
    check('is_active').isBoolean().withMessage('is_active cannot be null')

];

module.exports = ActivitySchema;
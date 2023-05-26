const { check } = require('express-validator');

const ActivitiesSchema = [
    check('title').isString().withMessage('title cannot be null'),
];

module.exports = ActivitiesSchema;
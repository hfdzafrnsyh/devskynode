const { check } = require('express-validator');

const ActivitySchema = [
    check('title').isString().withMessage('title cannot be null'),
    check('email').isString().withMessage('email cannot be null')
];

module.exports = ActivitySchema;
const express = require("express");
const router = express.Router();
const cors = require('cors');

const ActivitiesController = require("../../controller/ActivitiesController")
const ActivitySchema = require('../../schema/activities.schema');
const ActivitiesSchema = require('../../schema/activitiesupdate.schema');
const validationError = require("../../middleware/validationError")

router.use(cors())
router.use('*', cors())

router.get('/activity-groups', ActivitiesController.getAll);
router.get('/activity-groups/:id', ActivitiesController.getOne);
router.post('/activity-groups', ActivitySchema, validationError, ActivitiesController.createActivity);
router.put('/activity-groups/:id', ActivitiesSchema, validationError, ActivitiesController.updateActivity);
router.delete('/activity-groups/:id', ActivitiesController.deleteActivity);

module.exports = router;
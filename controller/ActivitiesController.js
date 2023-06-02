
const Model = require("../models/index");
const Activities = Model.activities;

module.exports.getAll = async (req, res) => {

    try {
        const activity = await Activities.findAll({})

        res.status(200).json({
            success: 'Success',
            message: 'Success',
            data: activity
        })
    } catch (e) {
        res.status(500).json({
            success: 'Fail',
            message: 'Failed',
            error: e
        })
        console.log(e)
    }

}


module.exports.getOne = async (req, res) => {

    try {

        const activityId = req.params.id;
        const activity = await Activities.findOne({ where: { activity_id: activityId } })

        if (!activity) {
            res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${activityId} Not Found`
            })
        } else {
            res.status(200).json({
                success: 'Success',
                message: 'Success',
                data: activity
            })
        }

    } catch (e) {
        res.status(500).json({
            success: 'Fail',
            message: 'Failed',
            error: e
        })
        console.log(e)
    }

}


module.exports.createActivity = async (req, res) => {

    try {

        const newActivity = {
            title: req.body.title,
            email: req.body.email
        }


        await Activities.create(newActivity)
        res.status(200).json({
            success: 'Success',
            message: 'Success',
            data: newActivity
        })

    } catch (e) {
        res.status(500).json({
            success: 'Fail',
            message: 'Failed',
            error: e
        })
        console.log(e)
    }

}


module.exports.updateActivity = async (req, res) => {

    try {

        const activityId = req.params.id;
        const activity = await Activities.findOne({ where: { activity_id: activityId } })

        if (!activity) {
            res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${activityId} Not Found`
            })
        } else {
            let newActivity = {
                title: req.body.title
            }

            await Activities.update(newActivity, { where: { activity_id: activityId } })

            res.status(200).json({
                success: 'Success',
                message: 'Success',
                data: newActivity
            })
        }


    } catch (e) {
        res.status(500).json({
            success: 'Fail',
            message: 'Failed',
            error: e
        })
        console.log(e)
    }

}

module.exports.deleteActivity = async (req, res) => {

    try {

        const activityId = req.params.id;
        const activity = await Activities.findOne({ where: { activity_id: activityId } })

        if (!activity) {
            res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${activityId} Not Found`
            })
        } else {
            await Activities.destroy({ where: { activity_id: activityId } })
            res.status(200).json({
                success: 'Success',
                message: 'Success',
                data: {}
            })
        }


    } catch (e) {
        res.status(500).json({
            success: 'Fail',
            message: 'Failed',
            error: e
        })
        console.log(e)
    }
}
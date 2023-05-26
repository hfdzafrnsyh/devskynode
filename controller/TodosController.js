const Model = require("../models/index");
const Todos = Model.todos;

module.exports.getAll = async (req, res) => {

    try {

        const activityId = req.query.activity_group_id;

        if (activityId) {

            const todos = await Todos.findAll({ where: { activity_group_id: activityId } })

            res.status(200).json({
                success: 'Success',
                message: 'Success',
                data: todos
            })

        } else {
            const todos = await Todos.findAll({})

            res.status(200).json({
                success: 'Success',
                message: 'Success',
                data: todos
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


module.exports.getDetailTodo = async (req, res) => {

    try {

        const todosId = req.params.id;
        const todos = await Todos.findOne({ where: { todo_id: todosId } })

        if (!todos) {
            res.status(404).json({
                status: "Not Found",
                message: `Todo with ID ${todosId} Not Found`
            })
        } else {
            res.status(200).json({
                success: 'Success',
                message: 'Success',
                data: todos
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


module.exports.createTodo = async (req, res) => {

    try {

        const newTodo = {
            title: req.body.title,
            priority: req.body.priority,
            activity_group_id: req.body.activity_group_id,
            is_active: req.body.is_active
        }


        await Todos.create(newTodo)

        res.status(200).json({
            success: 'Success',
            message: 'Success',
            data: newTodo
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


module.exports.updateTodo = async (req, res) => {

    try {

        const todosId = req.params.id;
        const todos = await Todos.findOne({ where: { todo_id: todosId } })

        if (!todos) {
            res.status(404).json({
                status: "Not Found",
                message: `Todo with ID ${todosId} Not Found`
            })
        } else {
            const newTodo = {
                title: req.body.title,
                priority: req.body.priority,
                activity_group_id: req.body.activity_group_id,
                is_active: req.body.is_active
            }

            await Todos.update(newTodo, { where: { todo_id: todosId } })

            res.status(200).json({
                success: 'Success',
                message: 'Success',
                data: newTodo
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

module.exports.deleteTodo = async (req, res) => {

    try {

        const todosId = req.params.id;
        const todos = await Todos.findOne({ where: { todo_id: todosId } })

        if (!todos) {
            res.status(404).json({
                status: "Not Found",
                message: `Todo with ID ${todosId} Not Found`
            })
        } else {
            await Todos.destroy({ where: { todo_id: todosId } })
            res.status(200).json({
                title: todos.title
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
const express = require("express");
const router = express.Router();
const cors = require('cors');

const TodosController = require("../../controller/TodosController")

const TodoSchema = require('../../schema/todos.schema');
const validationError = require("../../middleware/validationError")

router.use(cors())
router.use('*', cors())

router.get('/todo-items', TodosController.getAll);
router.get('/todo-items/:id', TodosController.getDetailTodo);
router.post('/todo-items', TodoSchema, validationError, TodosController.createTodo);
router.put('/todo-items/:id', TodoSchema, validationError, TodosController.updateTodo);
router.delete('/todo-items/:id', TodosController.deleteTodo);

module.exports = router;
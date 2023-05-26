'use strict'
const activities = require("./api/activities");
const todos = require("./api/todos");

const routes = (app) => {

    app.use(activities)
    app.use(todos)

}

module.exports=routes;

const request = require('supertest');
const app = require('../app');


const Model = require('../models/index');
const Todos = Model.todos;



describe('IT Todos', () => {
    
 
    beforeAll((done) => {
        done()
    });


   
    test(`it get todos `, () => {
        return request(app).get('/todo-items')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: 'Success',
                        message: 'Success',
                        data: expect.arrayContaining([
                            expect.objectContaining({
                                title: expect.any(String),
                                is_active:expect.any(Boolean),
                                priority:expect.any(String)
                            })
                        ])
                    })
                )
            })
    })



    test(`it get todos with Query`, () => {
        let activityId=3;
        return request(app).get(`/todo-items?activity_group_id=${activityId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: 'Success',
                        message: 'Success',
                        data: expect.arrayContaining([
                        ])
                    })
                )
            })
    })



    test(`it post todos `, () => {
      
        const data = {
            title: "test todo",
            priority: "very-low",
            activity_group_id: "1",
            is_active: true
        }

        return request(app).post('/todo-items')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       success : 'Success',
                       message : 'Success',
                       data : expect.objectContaining({
                            title: expect.any(String),
                            priority: expect.any(String),
                            is_active: expect.any(Boolean)
                       })
                    })
                )
            })
    })




    test(`it post todos but activityID null 400 response `, () => {
      
        const data = {
            title: "test todo",
            priority: "very-low",
            is_active: true
        }

        return request(app).post('/todo-items')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        status: 'bad request',
                        error: expect.objectContaining({
                            activity_group_id : expect.any(String)
                        })
                    })
                )
            })
    })



    test(`it post todos but title null 400 response `, () => {
      
        const data = {
            activity_group_id:1,
            priority: "very-low",
            is_active: true
        }

        return request(app).post('/todo-items')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        status: 'bad request',
                        error: expect.objectContaining({
                            title : expect.any(String)
                        })
                    })
                )
            })
    })




    test(`it get one by ID todos `, () => {
      
        let todoId=1;

        return request(app).get(`/todo-items/${todoId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       success : 'Success',
                       message : 'Success',
                       data : expect.objectContaining({
                            title: expect.any(String),
                            priority: expect.any(String),
                            is_active: expect.any(Boolean)
                       })
                    })
                )
            })
    })

    
    test(`it get one by ID todos but 404 response `, () => {
      
        let todoId=9999;

        return request(app).get(`/todo-items/${todoId}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        status: "Not Found",
                        message: `Todo with ID ${todoId} Not Found`
                    })
                )
            })
    })




    test(`it put todos status by ID`, () => {
      
        let todoId=1;
        

        const data = {
            title: "test todo",
            priority: "very-low",
            activity_group_id: "1",
            is_active: false
        }

        return request(app).put(`/todo-items/${todoId}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       success : 'Success',
                       message : 'Success',
                       data : expect.objectContaining({
                            title: expect.any(String),
                            priority: expect.any(String),
                            is_active: expect.any(Boolean)
                       })
                    })
                )
            })
    })


     
    test(`it put todos title by ID `, () => {
        let todoId=1;
        
        const data = {
            title: "update title todo",
            priority: "very-low",
            activity_group_id: "1",
            is_active: true
        }

        return request(app).put(`/todo-items/${todoId}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       success : 'Success',
                       message : 'Success',
                       data : expect.objectContaining({
                            title: expect.any(String),
                            priority: expect.any(String),
                            is_active: expect.any(Boolean)
                       })
                    })
                )
            })
    })


    test(`it put todos by ID but 404 response`, () => {
        let todoId=111111;
        
        const data = {
            title: "test todo",
            priority: "very-low",
            activity_group_id: "1",
            is_active: true
        }

        return request(app).put(`/todo-items/${todoId}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        status: "Not Found",
                        message: `Todo with ID ${todoId} Not Found`
                     })
                )
            })
    })


    test(`it delete todos `, () => {
        let todoId=14;

        return request(app).delete(`/todo-items/${todoId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                          title: expect.any(String)
                    })
                )
            })
    })


    test(`it delete todo but 404 response`, () => {
        let todoId=999;

        return request(app).delete(`/todo-items/${todoId}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        status: "Not Found",
                        message: `Todo with ID ${todoId} Not Found`
                     })
                )
            })
    })



    afterAll( () => {
        Todos.sequelize.close()
    })

})
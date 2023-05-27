const request = require('supertest');
const app = require('../app');


const Model = require('../models/index');
const Activities = Model.activities;
const Todos = Model.todos;




describe('IT ACTIVITIES', () => {
    
 
    beforeAll((done) => {
        done()
    });


   
    test(`it get activity `, () => {
        return request(app).get('/activity-groups')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: 'Success',
                        message: 'Success',
                        data: expect.arrayContaining([
                            expect.objectContaining({
                                email: expect.any(String),
                                title: expect.any(String)
                            })
                        ])
                    })
                )
            })
    })



    test(`it post activity `, () => {
        let data = {
            title : "test",
            email : "email@test.com"
        }
        return request(app).post('/activity-groups')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       success : 'Success',
                       message : 'Success',
                       data : expect.objectContaining({
                            email: expect.any(String),
                            title: expect.any(String),  
                       })
                    })
                )
            })
    })


    test(`it post activity but title null 400 response`, () => {
        let data = {
            email : "email@test.com"
        }

        return request(app).post('/activity-groups')
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



    test(`it get one by ID activity `, () => {
      
        let activityId=1;

        return request(app).get(`/activity-groups/${activityId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       success : 'Success',
                       message : 'Success',
                       data : expect.objectContaining({
                            email: expect.any(String),
                            title: expect.any(String),  
                       })
                    })
                )
            })
    })

    
    test(`it get one by ID activity but 404 response `, () => {
      
        let activityId=9999;

        return request(app).get(`/activity-groups/${activityId}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       status : 'Not Found',
                       message: `Activity with ID ${activityId} Not Found`
                    })
                )
            })
    })

     
    test(`it put activity by ID `, () => {
        let activityId=1;
        let data = {
            title : "testlahbro",
        }

        return request(app).put(`/activity-groups/${activityId}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       success : 'Success',
                       message : 'Success',
                       data : expect.objectContaining({
                            title: expect.any(String)
                       })
                    })
                )
            })
    })


    test(`it put activity by ID but 404 response`, () => {
        let activityId=999;
        let data = {
            title : "testlahbro",
        }

        return request(app).put(`/activity-groups/${activityId}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        status : 'Not Found',
                        message: `Activity with ID ${activityId} Not Found`
                     })
                )
            })
    })


    test(`it delete activity `, () => {
        let activityId=1;

        return request(app).delete(`/activity-groups/${activityId}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                       success : 'Success',
                       message : 'Success',
                       data : expect.objectContaining({
                       })
                    })
                )
            })
    })


    test(`it delete activity but 404 response`, () => {
        let activityId=999;

        return request(app).delete(`/activity-groups/${activityId}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        status : 'Not Found',
                        message: `Activity with ID ${activityId} Not Found`
                     })
                )
            })
    })



    // todos


   
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
        let todoId=1;

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
        Activities.sequelize.close()
        Todos.sequelize.close()
    })

})
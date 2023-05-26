const request = require('supertest');
const app = require('../app');
const path = require('path')

const Model = require('../models/index');
const Activities = Model.activities;


// // 400 gagal menambahkan todo title tidak diisi


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
        let activityId=12;

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



    afterAll( () => {
        Activities.sequelize.close()
    })

})
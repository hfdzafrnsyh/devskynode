const request = require('supertest');
const app = require('../app');
const path = require('path')

const Model = require('../models/index');
const Activities = Model.activities;



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

    



    

    afterAll( () => {
        Activities.sequelize.close()
    })

})
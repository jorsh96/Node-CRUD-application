const request = require('supertest')
const app = require("../src/app")





describe('GET /info', ()=>{

  test ('should get all info' , async()=>{
        await request(app)
        .get('/api/info')
        .set("Content-Type", "application/json; charset=utf-8")
        .expect(200);
   })

  it ('if it cant get a missing info' , async()=>{
    await request(app)
    .get('/api/info/30')
    .send("Content-Type", "application/json; charset=utf-8")
    .expect(404);
  })
  })




describe('POST /users', ()=>{
test('should respond with a 200 status code with success post', async()=>{
            await request(app).post('/api/info').send({ organization : "organization"}).expect("Content-Type", "application/json; charset=utf-8").expect(201)
          })

       test('should respond with a 400 status code with empty post', async()=>{
        await request(app).post('/api/info').send({}).expect(400)

    })
})


describe('PUT /users', ()=>{
        test('should respond with a 201 status code with success put', async()=>{
            await request(app).put('/api/info/1').send({ organization : "organization"}).expect("Content-Type", "application/json; charset=utf-8").expect(201)
          })

       test('should respond with a 400 status code with empty put', async()=>{
        await request(app).put('/api/info/1').send({}).expect(201)
         })
         })


describe('DELETE/users', ()=>{

      test('should respond with a 200 status code if successfully deleted', async()=>{
          await request(app).delete('/api/info/1').send({ organization : "organization"}).expect("Content-Type", "application/json; charset=utf-8").expect(200)
        })

     test('should respond with a 400 status when it is not found', async()=>{
      await request(app).delete('/api/info/30').send({}).expect(404)
       })

       })




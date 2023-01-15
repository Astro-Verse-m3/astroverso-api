import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import request from "supertest"
import { app } from "../../../app";
import { mockQuestion, mockQuestionEdit } from "../../mocks/questions.mocks";
import { mockAdm, mockUser } from "../../mocks/users.mocks";


describe("/questions", () => {
    let connection: DataSource

    beforeAll(async() => {
        await dataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /questions -  Must be able to create question",async () => {
        const adminLoginResponse = await request(app).post("/questions").send(mockAdm);
        const response = await request(app).post('/questions').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockQuestion)

        expect(response.body).toHaveProperty("question")
        expect(response.status).toBe(201)
     
    })

    test("POST /questions - Should not be able to create question that already exists",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const response = await request(app).post('/questions').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockQuestion)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /questions -  should not be able to create questions without authentication",async () => {
        const response = await request(app).post('/questions').send(mockQuestion)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("POST /questions - should not be able to create questions not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const response = await request(app).post('/questions').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockQuestion)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /questions -  Must be able to list all questions",async () => {
      
        const response = await request(app).get('/questions')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })
    /*
    test("GET /questions/:id -  Must be able to list question",async () => {
      
        const category = await request(app).get('/categories')
        const response = await request(app).get(`/categories/${category.body[0].id}/properties`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("properties")
        
    })

    test("GET /categories/:id/properties -  Should not be able to list properties of a category with invalid id",async () => {
      
        const response = await request(app).get(`/categories/13970660-5dbe-423a-9a9d-5c23b37943cf/properties`)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
        
    })*/

    test("DELETE /questions/:id -  should not be able to delete questions not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const UserTobeDeleted = await request(app).get('/questions').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/questions/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("DELETE /questions/:id -  should not be able to delete questions with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const response = await request(app).delete(`/questions/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    test("PATCH /questions/:id -  should not be able to update questions not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockUser);
        const adminLoginResponse = await request(app).post("/login").send(mockAdm);
        const userTobeUpdate = await request(app).get('/questions').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).patch(`/questions/${userTobeUpdate.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("PATCH /questions/:id -  should be able to update questions",async () => {
        const admingLoginResponse = await request(app).post("/login").send(mockAdm);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const questionTobeUpdateRequest = await request(app).get("/questions").set("Authorization", token)
        const questionTobeUpdateId = questionTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/questions/${questionTobeUpdateId}`).set("Authorization",token).send(mockQuestionEdit)

        const questionUpdated = await request(app).get("/users").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(questionUpdated.body[0].question).toEqual(mockQuestionEdit.question)
    })    

})
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import dataSourceConfig from "../../../data-source";
import { Quizzes } from "../../../entities/quizzes.entity";
import { createQuizService } from "../../../services/quiz/createQuiz.service";
import { listQuizzesService } from "../../../services/quiz/listQuizzes.service";
import { mockQuiz } from "../../mocks/quiz.mocks";

describe("/quiz", () => {
  let connection: DataSource;
  const quizRepo = dataSourceConfig.getRepository(Quizzes);

  beforeAll(async () => {
    await dataSourceConfig
      .initialize()
      .then((res) => (connection = res))
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const quizzes = await quizRepo.find();
    await quizRepo.remove(quizzes);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a Quiz", async () => {
    const response = await request(app).post("/quiz").send(mockQuiz);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body.name).toEqual()
  });

  test("Shouldn't be able to create a Quiz that already exists", async () => {
    const response = await request(app).post("/quiz").send(mockQuiz)
    
  })
  })

});

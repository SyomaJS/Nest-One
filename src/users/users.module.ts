import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) - should get a list of users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/users/:id (GET) - should get a user by ID', async () => {
    const userId = 1;
    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id', userId);
  });

  it('/users (POST) - should create a new user', async () => {
    const createUserDto = {};

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
  });

  it('/users/:id (PATCH) - should update a user', async () => {
    const userId = 1; 
    const updateUserDto = {};

    const response = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send(updateUserDto)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id', userId);
    // Add more assertions as needed
  });

  it('/users/:id (DELETE) - should delete a user', async () => {
    const userId = 1; 

    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(HttpStatus.OK);

    const deletedResponse = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});

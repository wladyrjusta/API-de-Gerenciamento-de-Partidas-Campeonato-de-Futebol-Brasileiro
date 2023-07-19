import { Request, Response, NextFunction } from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import loginMock from './mocks/login.mock';
import SequelizeUser from '../database/models/SequelizeUser';
import AuthMiddleware from '../middlewares/AuthMiddleware';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota de "/login"', () => {
  afterEach(()=>{
    sinon.restore();
  });
  describe('POST "/login"', () => {
    it('Quando email e senha válidos deve retornar um token', async () => {
      // Arrange
      sinon.stub(jwt, 'sign').resolves('valid-token');
      // Act
      const { status, body } =
      await chai.request(app).post('/login').send(loginMock.validLoginUser);
      
      // Assert
      expect(status).to.equal(200);
      expect(body).to.have.key('token');
      expect(body).to.deep.equal(loginMock.tokenResponse);
    });
  });
  describe('POST "/login"', () => {
    it('Quando email ou senha ausentes no corpo da requisição retorna status 400 e mensagem de erro', async () => {
      // Act
      const { status, body } =
      await chai.request(app).post('/login').send(loginMock.noCredentialsLoginUser);
      
      // Assert
      expect(status).to.equal(400);
      expect(body).to.deep.equal(loginMock.noEmailPasswordError.data);
    });
    it('Quando email ou senha em formatos inválidos no corpo da requisição retorna status 401 e mensagem de erro', async () => {
      // Act
      const { status, body } =
      await chai.request(app).post('/login').send(loginMock.invalidPassword);
      
      // Assert
      expect(status).to.equal(401);
      expect(body).to.deep.equal(loginMock.invalidEmailPasswordError.data);
    });
    it('Quando email ou senha em formatos válidos, porém inexstente no banco de dados, retorna status 401 e mensagem de erro', async () => {
      // Arrange
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
      // Act
      const { status, body } =
      await chai.request(app).post('/login').send(loginMock.validLoginUser);
      
      // Assert
      expect(status).to.equal(401);
      expect(body).to.deep.equal(loginMock.invalidEmailPasswordError.data);
    });
  });
  describe('GET "/login/role"', () => {
    it('Se token deve ser enviado pelo campo Authorization e conter a seguinte estrutura: "Bearer token", deve retornar status 200 com um objeto contendo a role do user', async () => {
      // Arrange
      const token = 'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTYwNzkyOH0.YKHURa7pQcR4g-F0MVqnB52cb18MIo5e7hHwYf3vOwg';
      const authMiddleware = new AuthMiddleware();
      sinon.stub(authMiddleware, 'authMiddleare').callsFake(async (req, res, next) => {
        res.locals.role = 'admin'; // Simule a adição do papel em res.locals
        await next(); // Certifique-se de aguardar a execução do próximo middleware ou rota
      });
      // Act
      const { status, body } = await chai.request(app)
        .get('/login/role')
        .set('Authorization', token);
              
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(loginMock.roleResponse);
    });
    it('Deve retornar status 401 quando não enviado token na rota', async () => {
      // Act
      const { status, body } = await chai.request(app)
        .get('/login/role');
              
      // Assert
      expect(status).to.equal(401);
      expect(body).to.deep.equal(loginMock.tokenNotFound);
    });
    it('Deve retornar status 401 quando token enviado é inválido', async () => {
      // Arrange
      const authMiddleware = new AuthMiddleware();
      sinon.stub(authMiddleware, 'authMiddleare').callsFake(async (req, res, next) => {
        res.locals.role = 'admin'; // Simule a adição do papel em res.locals
        await next(); // Certifique-se de aguardar a execução do próximo middleware ou rota
      });
      // Act
      const { status, body } = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'Baerer invalid-token');
              
      // Assert
      expect(status).to.equal(401);
      expect(body).to.deep.equal(loginMock.invalidToken);
    });
  });
});

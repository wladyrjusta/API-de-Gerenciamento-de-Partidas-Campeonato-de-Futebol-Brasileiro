import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import loginMock from './mocks/login.mock';
import SequelizeUser from '../database/models/SequelizeUser';
import JwtUtil from '../utils/JwtUtil';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota de "/login"', () => {
  afterEach(()=>{
    sinon.restore();
  })
  const jwtUtil = new JwtUtil();
  describe('POST "/login"', () => {
    it('Quando email e senha válidos deve retornar um token', async () => {
      // Act
      const { status, body } =
      await chai.request(app).post('/login').send(loginMock.validLoginUser);
      
      // Assert
      expect(status).to.equal(200);
      expect(body).to.have.key('token');
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
  // describe('GET "/login/role"', () => {
  //   it('Deve retornar dados de um time específico por id', async () => {
  //     // Arrange
  //     const teamByIdMock = SequelizeTeam.build(teamsMock.teamById);
  //     sinon.stub(SequelizeTeam, 'findOne').   resolves(teamByIdMock);
  //     // Act
  //     const { status, body } =
  //     await chai.request(app).get('/teams/1');
  //     // Assert
  //     expect(status).to.equal(200);
  //     expect(body).to.deep.equal(teamsMock.teamById);
  //   });
  //   it('Deve retornar status 404 e erro se id não presente no banco de dados', async () => {
  //     // Arrange
  //     const messageError = { message: 'Team id 55 not found'};
  //     sinon.stub(SequelizeTeam, 'findOne').   resolves(null);
  //     // Act
  //     const { status, body } =
  //     await chai.request(app).get('/teams/55');
  //     // Assert
  //     expect(status).to.equal(404);
  //     expect(body).to.deep.equal(messageError);
  //   });
  // });
});

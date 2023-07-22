import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesMock from './mocks/matches.mocks';
import SequelizeMatch from '../database/models/SequelizeMtach'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota de "/matches"', () => {
  afterEach(()=>{
    sinon.restore();
  })
  describe('GET "/matches"', () => {
    it('retorna uma lista de partidas', async () => {
      // Arrange
      const allMatchesMock = sinon.stub();
      allMatchesMock.resolves(matchesMock.allMatchesTeamsReturn);
      sinon.stub(SequelizeMatch, 'findAll').callsFake(allMatchesMock);
      // Act
      const { status, body } =
      await chai.request(app).get('/matches');
      
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesMock.allMatchesTeamsReturn);
    });
  });
  describe('GET "/matches?inProgress=true"', () => {
    it('serão filtradas e retornadas todas as partidas em andamento', async () => {
      // Arrange
      const allMatchesMock = sinon.stub();
      allMatchesMock.callsFake(
        async (options) => {
          if (options && options.where && options.where.inProgress === true) {
            const filteredMatches = matchesMock.allMatchesTeamsReturn.filter((match) => match.inProgress === true);
            return filteredMatches;
          }
          return matchesMock.allMatchesTeamsReturn;
        }
      );
      sinon.stub(SequelizeMatch, 'findAll').    callsFake(allMatchesMock);
      // Act
      const { status, body } =
      await chai.request(app).get('/matches?inProgress=true');      
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesMock.allMatchesInprogressTrue);
    });
  });
  describe('GET "/matches?inProgress=false"', () => {
    it('serão filtradas e retornadas todas as partidas finalizadas', async () => {
      // Arrange
      const allMatchesMock = sinon.stub();
      allMatchesMock.callsFake(
        async (options) => {
          if (options && options.where && options.where.inProgress === false) {
            const filteredMatches = matchesMock.allMatchesTeamsReturn.filter((match) => match.inProgress === false);
            return filteredMatches;
          }
          return matchesMock.allMatchesTeamsReturn;
        }
      );
      sinon.stub(SequelizeMatch, 'findAll').callsFake(allMatchesMock);
      // Act
      const { status, body } =
      await chai.request(app).get('/matches?inProgress=false');
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesMock.allMatchesInProgressFalse);
    });
  });
  describe('PATCH "/matches/:id/finish"', () => {
    const tokenNotFound = { message: 'Token not found' };
    const invalidToken = { message: 'Token must be a valid token' };
    const token = 'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTYwNzkyOH0.YKHURa7pQcR4g-F0MVqnB52cb18MIo5e7hHwYf3vOwg';
    it('Deve-se retornar, com um status 200 e a mensagem: "Finished"', async () => {
      // Arrange
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      // Act
      const { status, body } =
      await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', token);
        
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesMock.finishMatchReturn);
    });
    it('Deve-se retornar status 409 e mensagem de erro se partida inexistênte ou previamente encerrada', async () => {
      // Arrange
      const errorMessage = { message: 'Match already finished or not found' };
      sinon.stub(SequelizeMatch, 'update').resolves([0]);
      // Act
      const { status, body } =
      await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', token);
        
      // Assert
      expect(status).to.equal(409);
      expect(body).to.deep.equal(errorMessage);
    });
    it('Caso o token não seja informado, deve-se retornar, com um status 401 com mensagem de erro', async () => {
      // Arrange
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      // Act
      const { status, body } =
      await chai.request(app)
        .patch('/matches/1/finish');
        
      // Assert
      expect(status).to.equal(401);
      expect(body).to.deep.equal(tokenNotFound);
    });
    it('Caso o token informado não seja válido, deve-se retornar um status 401 com mensagem de erro', async () => {
      // Arrange
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      // Act
      const { status, body } =
      await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'invalid-token');;
        
      // Assert
      expect(status).to.equal(401);
      expect(body).to.deep.equal(invalidToken);
    });
  });
  describe('PATCH "/matches/:id"', () => {
    const successReturn = { message: 'Match scores updated' };
    const token = 'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTYwNzkyOH0.YKHURa7pQcR4g-F0MVqnB52cb18MIo5e7hHwYf3vOwg';
    it('Altera o resultado de uma partida e retorna status 200 e mensagem: "Match scores updated"', async () => {
      // Arrange
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      // Act
      const { status, body } =
      await chai.request(app)
        .patch('/matches/42')
        .set('Authorization', token);
              
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(successReturn);
    });
    it('retorna status 404 e mensagem de erro se partida não estiver em progresso ou não constar no banco de dados', async () => {
      // Arrange
      const errorResponse = { message: 'This Match wasnt in progress or found' };
      const finishedMatshMock = SequelizeMatch.build(matchesMock.finisehdMatch)
      sinon.stub(SequelizeMatch, 'findByPk').resolves(finishedMatshMock);
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      // Act
      const { status, body } =
      await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token);
              
      // Assert
      expect(status).to.equal(404);
      expect(body).to.deep.equal(errorResponse);
    });
  });
  describe('POST "/matches"', () => {
    const token = 'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTYwNzkyOH0.YKHURa7pQcR4g-F0MVqnB52cb18MIo5e7hHwYf3vOwg';
    it('Caso a partida seja inserida com sucesso, deve-se retornar os dados da partida, com status 201', async () => {
      // Arrange
      const newMatchMock = SequelizeMatch.build(matchesMock.newMatchReturn);
      sinon.stub(SequelizeMatch, 'create').resolves(newMatchMock);
      // Act
      const { status, body } =
      await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send(matchesMock.newMatchReturn);
              
      // Assert
      expect(status).to.equal(201);
      expect(body).to.deep.equal(matchesMock.newMatchReturn);
    });
    it('Se homeTeam e o awayTeam sejam iguais retorna status 422 e mensagem de erro', async () => {
      // Arrange
      const errorMessage = { message: 'It is not possible to create a match with two equal teams' };
      const sameTeamMock = SequelizeMatch.build(matchesMock.newMatchSameTeams);
      sinon.stub(SequelizeMatch, 'create').resolves(sameTeamMock);
      // Act
      const { status, body } =
      await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send(matchesMock.newMatchSameTeams);
              
      // Assert
      expect(status).to.equal(422);
      expect(body).to.deep.equal(errorMessage);
    });
    it('Caso algum dos times não esteja cadastrado no banco de dados, deve-se retornar, com um status 404 e mensagem de erro', async () => {
      // Arrange
      const errorMessage = { message: 'There is no team with such id!' };
      const sameTeamMock = SequelizeMatch.build(matchesMock.newMatchInvalidTeam);
      sinon.stub(SequelizeMatch, 'create').resolves(sameTeamMock);
      // Act
      const { status, body } =
      await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send(matchesMock.newMatchInvalidTeam);
              
      // Assert
      expect(status).to.equal(404);
      expect(body).to.deep.equal(errorMessage);
    });
  });
});

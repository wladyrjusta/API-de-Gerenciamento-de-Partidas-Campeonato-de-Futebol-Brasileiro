import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import teamsMock from '../mocks/teams.mock';
import SequelizeTeam from '../../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes das rotas de teams', () => {
  afterEach(()=>{
    sinon.restore();
  })
  describe('GET "/teams"', () => {
    it('Deve retornar todos os times corretamente', async () => {
      // Arrange
      const allTeamsMock = SequelizeTeam.bulkBuild(teamsMock.allTeams);
      sinon.stub(SequelizeTeam, 'findAll').    resolves(allTeamsMock);
      // Act
      const { status, body } =
      await chai.request(app).get('/teams');
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamsMock.allTeams);
    });
  });
  describe('GET "/teams/:id"', () => {
    it('Deve retornar dados de um time específico por id', async () => {
      // Arrange
      const teamByIdMock = SequelizeTeam.build(teamsMock.teamById);
      sinon.stub(SequelizeTeam, 'findOne').   resolves(teamByIdMock);
      // Act
      const { status, body } =
      await chai.request(app).get('/teams/1');
      // Assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamsMock.teamById);
    });
    it('Deve retornar status 404 e erro se id não presente no banco de dados', async () => {
      // Arrange
      const messageError = { message: 'Team id 55 not found'};
      sinon.stub(SequelizeTeam, 'findOne').   resolves(null);
      // Act
      const { status, body } =
      await chai.request(app).get('/teams/55');
      // Assert
      expect(status).to.equal(404);
      expect(body).to.deep.equal(messageError);
    });
  });
});

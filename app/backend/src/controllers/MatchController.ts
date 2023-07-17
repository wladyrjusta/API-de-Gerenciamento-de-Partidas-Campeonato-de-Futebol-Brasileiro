import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMtachesWithTeams(req: Request, res: Response) {
    const serviceResponse = await this.matchService.getAllMtachesWithTeams();

    return res.status(200).json(serviceResponse.data);
  }

  public async getByProgressWithTeams(req: Request, res: Response) {
    const q = req.query;
    const serviceResponse = await this.matchService.getByProgressWithTeams(q.inProgress as string);
    return res.status(200).json(serviceResponse.data);
  }

  public async finishMatchById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchService.finishMatchById(id);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatchesInProgress(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchService.updateMatchesInProgress(id, req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async createMatchInProgress(req: Request, res: Response) {
    const serviceResponse = await this.matchService.createMatchInProgress(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(201).json(serviceResponse.data);
  }
}

import { Request, Response } from 'express';
import get from 'lodash/get';
import PointRepository from '../repositories/PointRepository';
import IPointCreate from '../interfaces/entities/IPointCreate';

class PointsControllers {
	private pointsRepository: PointRepository;

	constructor() {
	  this.pointsRepository = new PointRepository;
	}

	async index (request: Request, response: Response) {
		const city = String(get(request.query, 'city', ''));
		const uf = String(get(request.query, 'uf', ''));
		const items = String(get(request.query, 'items', ''));
		const points = await this.pointsRepository.list(city, uf, items);

		return response.json(points);
	}
	
	async show (request: Request, response: Response) {
		const id = Number(request.params.id);
		const point = await this.pointsRepository.show(id);
		return response.json(point);
	}

	async create (request: Request, response: Response) {
	
		const {
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
			items,
		} = request.body;
	
		const pointData = {
			image: request.file.filename,
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
			items,
		} as IPointCreate;

		const createdPoint = await this.pointsRepository.create(pointData);
		return response.json(createdPoint);
	}

};

export default PointsControllers;
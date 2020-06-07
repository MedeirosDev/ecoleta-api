import knex from '../database/connection';
import IPointCreate from '../interfaces/entities/IPointCreate';
import first from 'lodash/first';
import IPoint from '../interfaces/entities/IPoint';
import ItemRepository from './ItemRepository';
import PointTransformer from '../transformers/PointTransformer';
import ResourceTransformer from '../transformers/ResourceTransformer';


export default class PointRepository {

	private itemRepository: ItemRepository;
	private transformer: PointTransformer;
	private resourceTransformer: ResourceTransformer<IPoint>;

	constructor() {
		this.itemRepository = new ItemRepository;
		this.transformer = new PointTransformer;
		this.resourceTransformer = new ResourceTransformer(this.transformer);
	}

  async list(city: string, uf: string, items: string) {
    
    const query = knex.from('points')
			.select('points.*')
			.join('point_items', 'point_items.point_id' ,'points.id');

    if (city) {
			query.where({ city });
    }

    if (uf) {
			query.where({ uf });
    }

    if (items) {
			const parsedItems = items
				.split(',')
				.map(item => Number(item.trim()));

			query.whereIn('point_items.item_id', parsedItems)
    }

		const points = await query.distinct();

		return this.resourceTransformer.transform(points);
  }

  async show(id: number): Promise<IPoint> {

    const point = await knex.from('points').where({ id }).first();
		const pointTransformed = this.transformer.transform(point);

		const items = await this.itemRepository.getByPointId(id);
		
    return {
			...pointTransformed,
			items,
    };
  }

  async create(pointData: IPointCreate): Promise<IPoint> {

    const trx = await knex.transaction();

    const items = pointData.items;
    delete pointData.items;

    const insertedIds = await trx('points').insert(pointData);
    const point_id = Number(first(insertedIds));

    const pointItems = items.split(',')
			.map((item_id: string) => {
				return {
					point_id,
					item_id: Number(item_id.trim()),
				};
			}
    );
    
    await trx('point_items').insert(pointItems);

    trx.commit();

    return await this.show(point_id);
  }
}
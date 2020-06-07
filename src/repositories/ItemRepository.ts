import knex from '../database/connection';
import IItem from '../interfaces/entities/IItem';
import ItemTransforme from '../transformers/ItemTransformer';
import ResourceTransformer from '../transformers/ResourceTransformer';

export default class ItemRepository {

  private transformer: ItemTransforme;
	private resourceTransformer: ResourceTransformer<IItem>;

	constructor() {
		this.transformer = new ItemTransforme;
		this.resourceTransformer = new ResourceTransformer(this.transformer);
	}

  async list(): Promise<IItem[]> {
    const items = await knex.from('items');

    return this.resourceTransformer.transform(items);
  }

  async getByPointId(pointId: number): Promise<IItem[]> {

    const items = await knex.from('items')
			.select('items.id', 'items.title', 'items.image')
			.join('point_items', 'point_items.item_id', 'items.id')
			.where('point_items.point_id', pointId);

    return this.resourceTransformer.transform(items);
  }
}
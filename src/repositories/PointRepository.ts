import knex from '../database/connection';
import IPointCreate from '../interfaces/entities/IPointCreate';
import first from 'lodash/first';
import IPoint from '../interfaces/entities/IPoint';
import * as dotenv from "dotenv";
dotenv.config();

export default class PointRepository {
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

    return await query.distinct();
  }

  async show(id: number): Promise<IPoint> {

    const point = await knex.from('points').where({ id }).first();

    const items = await knex.from('items')
        .select('items.id', 'items.title', 'items.image')
        .join('point_items', 'point_items.item_id', 'items.id')
        .where('point_items.point_id', id);

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `${process.env.BASE_URL}/uploads/${item.image}`,
        };
    });

    return {
        ...point,
        items: serializedItems,
    };
  }

  async create(pointData: IPointCreate): Promise<IPoint> {

    const trx = await knex.transaction();

    const items = pointData.items;
    delete pointData.items;

    const insertedIds = await trx('points').insert(pointData);
    const point_id = Number(first(insertedIds));

    const pointItems = items.map((item_id: number) => {
        return {
            point_id,
            item_id,
        };
    });
    
    await trx('point_items').insert(pointItems);

    trx.commit();

    return await this.show(point_id);
  }
}
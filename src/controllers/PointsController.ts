import { Request, Response } from 'express';
import knex from '../database/connection';
import first from 'lodash/first';

class PointsControllers {

    async index (request: Request, response: Response) {
        const { city, uf, items } = request.query;
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex.from('points')
        .select('points.*')
        .join('point_items', 'point_items.point_id' ,'points.id')
        .whereIn('point_items.item_id', parsedItems)
        .where({ city, uf })
        .distinct();

        return response.json(points);
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
    
        const trx = await knex.transaction();
        
        const pointData = {
            image: 'https://images.unsplash.com/photo-1569180880150-df4eed93c90b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('points').insert(pointData);
    
        const point_id = first(insertedIds);
    
        const pointItems = items.map((item_id: number) => {
            return {
                point_id,
                item_id,
            };
        });
    
        await trx('point_items').insert(pointItems);
    
        trx.commit();
        
        return response.json({
            id: point_id,
            items,
            ...pointData
        });
    }

    async show (request: Request, response: Response) {
        const { id } = request.params;

        const points = await knex.from('points').where({ id }).first();

        const items = await knex.from('items')
            .select('items.id', 'items.title', 'items.image')
            .join('point_items', 'point_items.item_id', 'items.id')
            .where('point_items.point_id', id);

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            };
        });

        return response.json({
            points,
            items: serializedItems,
        });
    }
};

export default PointsControllers;
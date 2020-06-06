import knex from '../database/connection';
import * as dotenv from "dotenv";
dotenv.config();

export default class ItemRepository {

  async list() {
    const items = await knex.from('items');

    const itemsSerializeds = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `${process.env.BASE_URL}/uploads/${item.image}`,
        };
    });

    return itemsSerializeds;
  }  
}
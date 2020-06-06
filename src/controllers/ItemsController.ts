import { Request, Response } from 'express';
import ItemRepository from '../repositories/ItemRepository';

class ItemsController {
    private itemRepository: ItemRepository;

    constructor() {
        this.itemRepository = new ItemRepository;
    }

    async index (request: Request, response: Response) {
        const items = await this.itemRepository.list();
        return response.json(items);
    }
}

export default ItemsController;
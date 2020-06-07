import BaseTransformer from "./BaseTransformer";
import IItem from "../interfaces/entities/IItem";
import * as dotenv from 'dotenv';
dotenv.config();

export default class ItemTransforme extends BaseTransformer<IItem> {
  
  transform(item: IItem): IItem {
    return {
      ...item,
      image: `${process.env.BASE_URL}/uploads/items/${item.image}`,
    };
  }
}
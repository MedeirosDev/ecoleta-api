import BaseTransformer from "./BaseTransformer";
import IPoint from "../interfaces/entities/IPoint";
import * as dotenv from 'dotenv';
dotenv.config();

export default class PointTransformer extends BaseTransformer<IPoint> {
  
  transform(point: IPoint): IPoint {
    return {
      ...point,
      image: `${process.env.BASE_URL}/uploads/points/${point.image}`,
    };
  }
}
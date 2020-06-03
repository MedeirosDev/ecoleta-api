import express from 'express';
import path from 'path';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController;
const itemsController = new ItemsController;

routes.use(
    '/uploads',
    express.static(
        path.resolve(__dirname, '..', 'uploads')
    )
);

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);



export default routes;
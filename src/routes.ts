import express, { Request, Response } from 'express';
import path from 'path';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';

const pointsController = new PointsController;
const itemsController = new ItemsController;

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/', (request: Request, response: Response) => {
	response.json({ message: 'success' });
});

routes.use(
	'/uploads',
	express.static(
		path.resolve(__dirname, '..', 'uploads')
	)
);

routes.get('/items', itemsController.index.bind(itemsController));
routes.get('/points', pointsController.index.bind(pointsController));
routes.get('/points/:id', pointsController.show.bind(pointsController));

routes.post(
	'/points',
	upload.single('image'),
	pointsController.create.bind(pointsController)
);



export default routes;
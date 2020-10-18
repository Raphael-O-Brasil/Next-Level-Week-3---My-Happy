import {Router} from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import OrfanatoControlers from './controllers/orfanatosControle';

const routes = Router()
const upload = multer(uploadConfig);

routes.get('/orfanatos', OrfanatoControlers.index);
routes.get('/orfanatos/:id', OrfanatoControlers.show);
routes.post('/orfanatos', upload.array('images'), OrfanatoControlers.create);

export default routes;
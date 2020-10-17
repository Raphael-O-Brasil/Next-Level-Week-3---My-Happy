import express, { response } from 'express';
import './database/connections';
import {getRepository} from 'typeorm';
import Orfanato from './models/Orfanato';
import routes from './routes';


import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import errorHandler from './errors/handler';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));
app.use(errorHandler);

/*
app.post('/orfanatos', async (request, response) => {
    const{
        name,
        latitude,
        longitude,
        about,
        instrucao,
        funcionamento,
        finaldesemana,
    } = request.body;
    const orfanatosRepositorio = getRepository(Orfanato);
    const orfanato = orfanatosRepositorio.create({
        name,
        latitude,
        longitude,
        about,
        instrucao,
        funcionamento,
        finaldesemana,
    });
    await orfanatosRepositorio.save(orfanato);
    return response.
    status(201).
    json(orfanato);
});
*/
app.listen(666);


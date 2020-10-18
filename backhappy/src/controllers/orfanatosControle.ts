import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import orfanatosView from '../views/orfanatos_views';
import * as Yup from 'yup';

import Orfanato from '../models/Orfanato';
export default {
    async index(request:Request, response:Response){
        const orfanatosrespositorio = getRepository(Orfanato);
        const orfanatos = await orfanatosrespositorio.find({
            relations: ['images']
        });
        return response.json(orfanatosView.renderMany(orfanatos));
    },
    async show(request:Request, response:Response){
        const {id} = request.params;
        const orfanatosrepositorio = getRepository(Orfanato);
        const orfanato = await orfanatosrepositorio.findOneOrFail(id,{
            relations: ['images']
        });
        return response.json(orfanatosView.render(orfanato));
    },
    async create(request:Request, response:Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instrucao, 
            funcionamento,
            finaldesemana,
        } = request.body
        const orfanatosrepositorio = getRepository(Orfanato);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image=>{
            return {path: image.filename}
        });
        const data = {
            name,
            latitude,
            longitude,
            about,
            instrucao, 
            funcionamento,
            finaldesemana: finaldesemana === 'true',
            images
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instrucao: Yup.string().required(),
            funcionamento: Yup.string().required(),
            finaldesemana: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path:Yup.string().required()
                })
            )
        });

        await schema.validate(data,{
            abortEarly:false,
        });
            
        const orfanato = orfanatosrepositorio.create(data);
        await orfanatosrepositorio.save(orfanato);
        return response.status(201).json(orfanato);
    }
}
import Orfanato from '../models/Orfanato';
import imagesView from './images_View';

export default{
    render(orfanato: Orfanato){
        return {
            id:  orfanato.id,
            name: orfanato.name,
            latitude: orfanato.latitude,
            longitude: orfanato.longitude,
            about: orfanato.about,
            instrucao: orfanato.instrucao,
            funcionamento: orfanato.funcionamento,
            finaldesemana: orfanato.finaldesemana,
            images: imagesView.renderMany(orfanato.images)

        };
    }, 
    renderMany(orfanatos: Orfanato[]){
        return orfanatos.map(orfanato=>this.render(orfanato));
    }
};
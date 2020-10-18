import React, {ChangeEvent, FormEvent, useState} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";
import '../styles/pages/create-orphanage.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/marker';
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, SetPosition] = useState({latitude:0, longitude:0});
  const [nome, setNome] = useState('');
  const [about, setabout] = useState('');
  const [instrucao, setinstrucao] = useState('');
  const [funcionamento, setfuncionamento] = useState('');
  const [finaldeseman, setfinaldeseman] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [visualizarimages, setvisualizar] = useState<string[]>([]);
  function pegarposicaoMapa(event: LeafletMouseEvent ){
    const {lat, lng}=event.latlng;
    SetPosition({
      latitude: lat,
      longitude: lng
    });
  }

  async function mandarformulario(event: FormEvent){
    event.preventDefault();
    const {latitude, longitude}= position;
    const data = new FormData();
    data.append('name', nome);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instrucao', instrucao);
    data.append('funcionamento', funcionamento);
    data.append('finaldesemana', String(finaldeseman));
    
    images.forEach(image=>{
      data.append('images', image);
    });
   await api.post('/orfanatos', data);
    history.push('/app');
  }

  function pegarimagensselecionadas(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }
    const imagensselecionadas = Array.from(event.target.files);
    setImages(imagensselecionadas);

    const Visualizarselecionadas = imagensselecionadas.map(image=>{
      return URL.createObjectURL(image);
    });
    setvisualizar(Visualizarselecionadas);

  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>
      <main>
        <form onSubmit={mandarformulario} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              style={{ width: '100%', height: 280 }}
              center={[-24.0194621,-46.5011451]}
              zoom={15}
              onClick={pegarposicaoMapa}
            >
              <TileLayer 
             url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />


            {position.latitude !== 0 && 
            (
            <Marker 
            interactive={false} 
            icon={mapIcon} 
            position={[position.latitude,position.longitude]}
            />
              )}
             </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={nome} 
              onChange={event=>setNome(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300}  value={about} 
              onChange={event=>setabout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {visualizarimages.map(image=>{
                  return(
                    <img key={image} src={image} alt={nome}/>
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
                <input multiple onChange={pegarimagensselecionadas} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions"  value={instrucao} 
              onChange={event=>setinstrucao(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours"  value={funcionamento} 
              onChange={event=>setfuncionamento(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={finaldeseman ? 'active' : ''}
                onClick={()=>setfinaldeseman(true)}>Sim</button>
                <button type="button" className={!finaldeseman ? 'active' : ''}
                onClick={()=>setfinaldeseman(false)}>Não</button> 
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

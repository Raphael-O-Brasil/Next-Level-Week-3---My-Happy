import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
//import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import '../styles/pages/orphanage.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/marker';
import api from '../services/api';
interface Orfanato{
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instrucao: string;
    funcionamento: string;
    finaldesemana: string;
    images: Array<{
      id: number;
      url: string;
    }>;
}

interface orfanatoParam{
  id: string;
}

export default function Orphanage() {
  const [orfanato, setOrfanato] = useState<Orfanato>();
  const params = useParams<orfanatoParam>();
  const [imagemativaindex, setAtivarImageIndex] = useState(0);
  console.log(orfanato?.finaldesemana);
  useEffect(()=>{
      api.get(`orfanatos/${params.id}`)
      .then(response=>{
          setOrfanato(response.data);
      });
  },[params.id]);

  if(!orfanato){
    return(
      <div>aguarde...</div>
    );
  }
  return (
    <div id="page-orphanage">
      <Sidebar/>
      <main>
        <div className="orphanage-details">
          <img src={orfanato.images[imagemativaindex].url} alt={orfanato.name} />

          <div className="images">
            {orfanato.images.map((image, key)=>{
              return(
                <button className={imagemativaindex===key?'active':''} 
                type="button" key={image.id}
                onClick={()=>{
                  setAtivarImageIndex(key);
                }}
                >
                  <img src={image.url} alt={orfanato.name} />
                </button>
                );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orfanato.name}</h1>
            <p>{orfanato.about}</p>

            <div className="map-container">
              <Map 
                
              center={[orfanato.latitude,orfanato.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

              <Marker interactive={false} icon={mapIcon} position={[orfanato.latitude,orfanato.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orfanato.latitude},${orfanato.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orfanato.instrucao}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orfanato.funcionamento}
              </div>
              {orfanato.finaldesemana ? (
                
              <div className="open-on-weekends">
              <FiInfo size={32} color="#39CC83" />
              Atendemos <br />
              fim de semana
            </div>
              ):(
                
              <div className="open-on-weekends dont-open">
              <FiInfo size={32} color="#FF669D" />
              Não atendemos <br />
              fim de semana
            </div>
              )}
            </div>

            {/*<button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
              </button>*/}

          </div>
        </div>
      </main>
    </div>
  );
}
import React, {useEffect, useState} from 'react';
import mapMarkerImg from '../imagens/marker.svg';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import '../styles/pages/orphanage-map.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import mapIcon from '../utils/marker';
import api from '../services/api';
interface Orfanatos{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function OrphanagesMaps(){
    const [orfanatos, setOrfanato] = useState<Orfanatos[]>([]);
    useEffect(()=>{
        api.get('orfanatos')
        .then(response=>{
            setOrfanato(response.data);
        });
    },[]);
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>
                        Muitas crianças estão esperando a sua visita :)
                    </p>
                </header>

                <footer>
                    <strong>
                        Praia Grande
                    </strong>
                    <span>
                        São Paulo
                    </span>
                </footer>
            </aside>
            <Map
            center={[-24.0194621,-46.5011451]}
             zoom={13}
             style={{width:'100%', height:'100%'}}>
                  <TileLayer
             url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {
                orfanatos.map((item, key)=>{
                    return(
                       
                             <Marker
                        icon={mapIcon}
                        position={[item.latitude,item.longitude]}
                        key={key}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {item.name}
                                    <Link to={`/orfanato/${item.id}`}>
                                        <FiArrowRight size={20} color="#FFF"/>
                                    </Link>
                            </Popup>
                        </Marker>
                    )
                })
            }                 
            </Map>    
           
            <Link to="/orfanato/criar" className="create-orphanage">
                <FiPlus
                size={32}
                color="#FFF"/>
            </Link>
        </div>
    );
}
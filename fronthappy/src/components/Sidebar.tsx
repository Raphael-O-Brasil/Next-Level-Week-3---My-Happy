import React from 'react';
import mapMarkerImg from '../imagens/marker.svg';
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import '../styles/pages/components/Sidebar.css';

export default function SideBar(){
    const { goBack } = useHistory();
    return(
        
      <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    );
}
import React from 'react';
import './travelitinerary.css';
import { Navbar } from '../components/Navbar';
import { TravelPlanCard } from '../components/TravelPlanCard';


const TravelItineraryPage: React.FC = () => {
  return (
    <div className="travel-itinerary-page">
      <header>
        <h1>Tela de montar o itinerário</h1>
        <input type="text" placeholder="Pesquisar um lugar" />
      </header>

      <section className="image-gallery">
        <img src="/path/to/eiffel-tower.jpg" alt="Torre Eiffel" />
        <img src="/path/to/french-flag.jpg" alt="Bandeira da França" />
      </section>

      <main>
        <h2>Viagem para Paris</h2>
        <div className="days-grid">
          <div className="day-card">Dia 1</div>
          <div className="day-card">Dia 2</div>
          <div className="day-card">Dia 3</div>
          <div className="day-card">Dia 4</div>
          <div className="day-card">Dia 5</div>
          <div className="day-card">Dia 6</div>
          <div className="day-card">Dia 7</div>
        </div>
      </main>
    </div>
  );
};

export default TravelItineraryPage;
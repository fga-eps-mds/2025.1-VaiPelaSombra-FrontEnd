import Navbar from "../components/NavBar.tsx";
import TravelPlanCard from "../components/TravelPlanCard";
import "./Plano-Viagens.css"; // Crie este arquivo para os estilos da página

// Exemplo de dados mockados
const travelPlans = [
  {
    image: "/src/assets/images/1323726277_1323274432_01.png",
    title: "Viagem para Paris",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2025",
    daysLeft: 120,
  },
  {
    image: "/src/assets/images/hq720.jpg",
    title: "Xique-Xique number 1",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2025",
    daysLeft: 120,
  },
  {
    image: "/src/assets/images/Imagen_de_los_canales_concéntricos_en_Ámsterdam.webp",
    title: "Vamos pra Holanda",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2025",
    daysLeft: 120,
  },
  {
    image: "/src/assets/images/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.webp",
    title: "I ❤ New York",
    users: [
      { name: "GoombaExample.jpeg", avatar: "/src/assets/images/GoombaExample.jpeg" },
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "29 de Julho de 2025",
    daysLeft: 42,
  },
  {
    image: "/src/assets/images/i764852.png",
    title: "bora cumer",
    users: [
      { name: "GoombaExample.jpeg", avatar: "/src/assets/images/GoombaExample.jpeg" },
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "18 de Novembro de 2025",
    daysLeft: 120,
  },
  {
    image: "/src/assets/images/Paracas_National_Reserve._Ica,_Peru.webp",
    title: "Viagem para Peru",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "18 de Novembro de 2025",
    daysLeft: 120,
  },
];

const travelHistory = [
  {
    image: "/src/assets/images/hq720.jpg",
    title: "Xique-Xique number 1",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2023",
    daysLeft: 0,
    faded: true,
  },
  {
    image: "/src/assets/images/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_août_2014_(2).webp",
    title: "Viagem para Paris",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2023",
    daysLeft: 0,
    faded: true,
  },
];

/*
function Home() {
  const { theme, setTheme } = useAppContext()

// Exemplo de dados mockados
const travelPlans = [
  {
    image: "/src/assets/images/1323726277_1323274432_01.png",
    title: "Viagem para Paris",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2025",
    daysLeft: 120,
  },
  {
    image: "/src/assets/images/hq720.jpg",
    title: "Xique-Xique number 1",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2025",
    daysLeft: 120,
  },
  {
    image: "/src/assets/images/Imagen_de_los_canales_concéntricos_en_Ámsterdam.webp",
    title: "Vamos pra Holanda",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2025",
    daysLeft: 120,
  },
  {
    image: "/src/assets/images/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.webp",
    title: "I ❤ New York",
    users: [
      { name: "GoombaExample.jpeg", avatar: "/src/assets/images/GoombaExample.jpeg" },
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "29 de Julho de 2025",
    daysLeft: 42,
  },
  {
    image: "/src/assets/images/i764852.png",
    title: "bora cumer",
    users: [
      { name: "GoombaExample.jpeg", avatar: "/src/assets/images/GoombaExample.jpeg" },
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "18 de Novembro de 2025",
    daysLeft: 120,
  },
  {
    image: "/src/assets/images/Paracas_National_Reserve._Ica,_Peru.webp",
    title: "Viagem para Peru",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
      { name: "Luís", avatar: "/src/assets/images/Luis-PatoAventuras2017.webp" },
    ],
    date: "18 de Novembro de 2025",
    daysLeft: 120,
  },
];

const travelHistory = [
  {
    image: "/src/assets/images/hq720.jpg",
    title: "Xique-Xique number 1",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2023",
    daysLeft: 0,
    faded: true,
  },
  {
    image: "/src/assets/images/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_août_2014_(2).webp",
    title: "Viagem para Paris",
    users: [
      { name: "Hugo", avatar: "/src/assets/images/Hugo-PatoAventuras2017.webp" },
      { name: "José", avatar: "/src/assets/images/Paco-PatoAventuras2017.webp" },
    ],
    date: "23 de Outubro de 2023",
    daysLeft: 0,
    faded: true,
  },
];

const PlanoViagens: React.FC = () => (
  <div className="plano-viagens-bg">
    <Navbar />
    <div className="plano-viagens-container">
      <div className="plano-viagens-actions">
        <button className="btn-primary">
          + Criar um novo plano de viagem
        </button>
        <button className="btn-outline">
          Entrar com Link
        </button>
      </div>

      <h2 className="plano-viagens-section-title">Seus planos de viagens</h2>
      <div className="plano-viagens-cards">
        {travelPlans.map((plan, idx) => (
          <TravelPlanCard key={idx} {...plan} />
        ))}
      </div>

      <h2 className="plano-viagens-section-title">Histórico de planos de viagens</h2>
      <div className="plano-viagens-cards">
        {travelHistory.map((plan, idx) => (
          <TravelPlanCard key={idx} {...plan} />
        ))}
      </div>
    </div>
  )
}
  export default Home
*/
const PlanoViagens: React.FC = () => (
  <div className="plano-viagens-bg">
    <Navbar />
    <div className="plano-viagens-container">
      <div className="plano-viagens-actions">
        <button className="btn-primary">
          + Criar um novo plano de viagem
        </button>
        <button className="btn-outline">
          Entrar com Link
        </button>
      </div>

      <h2 className="plano-viagens-section-title">Seus planos de viagens</h2>
      <div className="plano-viagens-cards">
        {travelPlans.map((plan, idx) => (
          <TravelPlanCard key={idx} {...plan} />
        ))}
      </div>

      <h2 className="plano-viagens-section-title">Histórico de planos de viagens</h2>
      <div className="plano-viagens-cards">
        {travelHistory.map((plan, idx) => (
          <TravelPlanCard key={idx} {...plan} />
        ))}
      </div>
    </div>
  </div>
);

export default PlanoViagens;

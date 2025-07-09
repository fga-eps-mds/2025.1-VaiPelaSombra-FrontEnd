import React from "react";
import { useNavigate } from "react-router-dom";
import "./TravelPlanCard.css";

interface User {
  name: string;
  id: number;
}

interface TravelPlanCardProps {
  title: string;
  users: User[];
  date: string;
  daysLeft: number;
  faded?: boolean;
  itineraryId?: number; 
}

const TravelPlanCard: React.FC<TravelPlanCardProps> = ({
  title,
  users,
  date,
  daysLeft,
  faded = false,
  itineraryId,
}) => {
  const navigate = useNavigate(); 
  return (
    <div className={`travel-plan-card${faded ? " faded" : ""}`}>
      <div className="travel-plan-content">
        <div className="travel-plan-title">{title}</div>
        <div className="travel-plan-date">
          {date} • Faltam {daysLeft} dias
        </div>
        {users.length > 0 && (
      <div className="travel-plan-users-names">
        Participantes: {users.map((user, index) => (
        <span key={user.id}> 
       {user.name}{index < users.length - 1 ? ', ' : ''}
       </span>
      ))}
     </div>)}

        {!faded && itineraryId && (
          <button
            className="travel-plan-edit-button"
            onClick={() => navigate(`/editar-plano/${itineraryId}`)}
          >
            Editar plano
          </button>
        )}
      </div>
    </div>
  );
};

export default TravelPlanCard;
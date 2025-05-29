import React from "react";
import "./TravelPlanCard.css";

interface User {
  name: string;
  avatar: string;
}

interface TravelPlanCardProps {
  image: string;
  title: string;
  users: User[];
  date: string;
  daysLeft: number;
  faded?: boolean;
}

const TravelPlanCard: React.FC<TravelPlanCardProps> = ({
  image,
  title,
  users,
  date,
  daysLeft,
  faded = false,
}) => (
  <div className={`travel-plan-card${faded ? " faded" : ""}`}>
    <img src={image} alt={title} className="travel-plan-image" />
    <div className="travel-plan-content">
      <div className="travel-plan-title">{title}</div>
      <div className="travel-plan-users">
        {users.map((u, i) => (
          <img
            key={u.name}
            src={u.avatar}
            alt={u.name}
            className="travel-plan-user-avatar"
            style={{ marginLeft: i === 0 ? 0 : -10 }}
          />
        ))}
      </div>
      <div className="travel-plan-date">
        {date} • Faltam {daysLeft} dias
      </div>
    </div>
  </div>
);

export default TravelPlanCard;
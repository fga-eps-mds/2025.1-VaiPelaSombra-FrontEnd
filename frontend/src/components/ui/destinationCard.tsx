import { useNavigate } from "react-router-dom";

interface Destination {
  id: number;
  name: string;
  imageUrl: string;
}

export default function DestinationCard({ id, name, imageUrl }: Destination) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/galeria/${id}`)}
      className="cursor-pointer rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105"
    >
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4 text-center text-xl font-medium">{name}</div>
    </div>
  );
}

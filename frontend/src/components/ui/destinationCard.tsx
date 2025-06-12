import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  imageUrl: string;
}

export default function DestinationCard({ id, name, imageUrl }: Destination) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/inf-destino/${id}`)}
      className="cursor-pointer rounded-2xl shadow-md bg-white overflow-hidden transition transform hover:scale-105 md:hover:shadow-lg md:hover:scale-[1.03]"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-44 object-cover"
      />

      <div className="p-4 flex items-center justify-center gap-2">
        <MapPin className="text-[#223A60] w-5 h-5" />
        <span className="text-lg font-semibold text-[#223A60] leading-none">
          {name}
        </span>
      </div>
    </div>
  );
}

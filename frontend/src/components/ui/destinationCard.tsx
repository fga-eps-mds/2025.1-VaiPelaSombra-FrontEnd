import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  imageUrl: string;
}

export default function DestinationCard({ name, imageUrl }: Destination) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/inf-destino/${name}`)}
      className="cursor-pointer rounded-2xl shadow-md bg-white overflow-hidden transition transform hover:scale-105 md:hover:shadow-lg md:hover:scale-[1.03]"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-44"
      />

      <div className="p-4 flex items-center justify-center gap-2">
        <MapPin className="text-[#223A60] w-5 h-5 relative top-[-2px]" />
        <span className="text-lg font-medium text-black leading-none">
          {name}
        </span>
      </div>
    </div>
  );
}

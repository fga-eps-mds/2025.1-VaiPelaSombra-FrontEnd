import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

interface Destination {
  id: number;
  title: string;
  imageUrl: string;
}

export default function DestinationCard({ title, imageUrl, id}: Destination) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/inf-destino/${id}`)}
      className="cursor-pointer rounded-2xl shadow-md bg-white overflow-hidden transition transform hover:scale-105 md:hover:shadow-lg md:hover:scale-[1.03]"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-44"
      />

      <div className="p-4 flex items-center justify-center gap-2">
        <MapPin className="text-[#223A60] w-5 h-5 relative top-[-2px]" />
        <span className="text-lg font-medium text-black leading-none">
          {title}
        </span>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import NoImage from "../../assets/NoImage.png"

interface Destination {
  id: number;
  title: string;
  imageUrl: string | null;
}

export default function DestinationCard({ title, imageUrl, id }: Destination) {
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:3000';
  const fullImageUrl = imageUrl
    ? `${API_BASE_URL}${imageUrl}`
    : NoImage;

  return (
    <div
      onClick={() => navigate(`/inf-destino/${id}`)}
      className="cursor-pointer rounded-2xl shadow-md bg-white overflow-hidden transition transform hover:scale-105 md:hover:shadow-lg md:hover:scale-[1.03]"
    >
      <img
        src={fullImageUrl}
        alt={`Imagem de ${title}`}
        className="w-full h-44"
      />

      <div className="p-4 flex items-center justify-center gap-2 transform-gpu will-change-transform backface-hidden">
        <MapPin className="text-[#223A60] w-5 h-5 relative top-[-2px]" />
        <span className="text-lg font-medium text-black leading-none">
          {title}
        </span>
      </div>
    </div>
  );
}

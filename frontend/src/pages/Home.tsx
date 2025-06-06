import DestinationCard from "../components/ui/destinationCard.tsx";
import SearchBar from "../components/ui/searchBar.tsx";
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar.tsx";
import ImagemFundo from "../assets/ImagemFundo.jpg"
import imagem4 from "../assets/imagem4.jpg";

interface Destination {
  id: number;
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [destinos, setDestinos] = useState<Destination[]>([]);
  const [search, setSerach] = useState("");

  //mockado por enquanto
  useEffect(() => {
    async function fetchDestinos() {
      setDestinos([
        { id: 1, name: "Rio de Janeiro", imageUrl:imagem4 },
        { id: 2, name: "Salvador", imageUrl:imagem4 },
        { id: 3, name: "Recife", imageUrl:imagem4 },
        { id: 4, name: "Sao Paulo", imageUrl:imagem4 },
        { id: 5, name: "Goiais", imageUrl:imagem4 },
        { id: 6, name: "Brasilia", imageUrl:imagem4 },
      ]);
    }
    fetchDestinos();
  }, []);

  const destinosFiltrados = destinos.filter((des: Destination) =>
    des.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full flex flex-col bg-white">
        <div className="h-[400px] w-full flex flex-col p-6 mt-4 bg-cover bg-no-repeat bg-center justify-center items-center leading-snug" style={{ backgroundImage: `url(${ImagemFundo})`}}>
          <div>
            <div className="text-center mt-19">
              <h1 className="text-4xl font-bold drop-shadow text-[#223A60] justify-center">
              Embarque Já na sua Jornada para <br/ >
              Descobrir As Férias Ideais
              </h1>
            </div>
            <div className="mt-8">
              <SearchBar value={search} onChange={setSerach}/>
            </div>
          </div>
        </div>

        <div className=" w-full p-6 mt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {destinosFiltrados.map((destino) => (
              <DestinationCard
                key={destino.id}
                id={destino.id}
                name={destino.name}
                imageUrl={destino.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

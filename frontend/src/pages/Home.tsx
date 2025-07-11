import DestinationCard from "../components/ui/destinationCard.tsx";
import SearchBar from "../components/ui/searchBar.tsx";
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar.tsx";
import ImagemFundo3 from "../assets/ImagemFundo3.jpeg"
import axios from "axios";


interface Destination {
  id: number;
  title: string;
  imageUrl: string;
}

export default function Home() {
  const [destinos, setDestinos] = useState<Destination[]>([]);
  const [search, setSearch] = useState("");


  async function fetchDestinos(title?: string) {
    try {
      const response = await axios.get("http://localhost:3000/home",
        {
        params: title ? { search: title } : {},
        }
      );
      setDestinos(response.data);
    } catch (error) {
      console.error("Erro ao buscar destinos:", error);
    }
  }


  useEffect(() => {
    fetchDestinos();
  }, []);


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchDestinos(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full flex flex-col bg-white">
        <div className="h-[385px] w-full flex flex-col p-6 mt-4 mb-3 bg-cover bg-no-repeat bg-center justify-center items-center" style={{ backgroundImage: `url(${ImagemFundo3})`}}>
          <div className="">
            <div className="text-center mt-19">
              <h1 className="text-4xl font-bold drop-shadow text-[#223A60] justify-center">
              Embarque Já na sua Jornada para <br/ >
              Descobrir As Férias Ideais
              </h1>
            </div>
            <div className="mt-8">
              <SearchBar value={search} onChange={setSearch}/>
            </div>
          </div>
        </div>

        <div className="w-full p-6 mt-1">
          {destinos.length === 0 && search.trim() !== "" ? (
            <p className="text-center text-gray-500 text-lg font-semibold">
              Nenhum destino encontrado para "{search}".
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-7.5">
              {destinos.map((destino) => (
                <DestinationCard
                  key={destino.id}
                  id={destino.id}
                  title={destino.title}
                  imageUrl={destino.imageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

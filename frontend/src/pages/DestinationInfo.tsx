import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { CalendarPlus, Info, BookOpen, Earth } from "lucide-react";
import { Tabs,TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { config } from "@/config";

interface Destination {
    id: number;
    title: string;
    locationName: string;
    description: string;
    localClimate?: string;
    timeZone?: string;
    latitude: number;
    longitude: number;
}

interface DestinationImage {
    id: number;
    url: string;
}

export default function DestinationInfo() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [destination, setDestination] = useState<Destination | null>(null);
    const [images, setImages] = useState<DestinationImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchDestinationData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [destinationResponse, imagesResponse] = await Promise.all([
                    fetch(`${config.apiBaseUrl}/destinations/${id}`),
                    fetch(`${config.apiBaseUrl}/destinations/${id}/images`)
                ]);

                if (!destinationResponse.ok || !imagesResponse.ok) {
                    throw new Error("Falha ao carregar dados do destino.");
                }

                const destinationData: Destination = await destinationResponse.json();
                const imagesData: DestinationImage[] = await imagesResponse.json();

                setDestination(destinationData);
                setImages(imagesData);

            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocorreu um erro desconhecido.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDestinationData();
    }, [id]);

    const handlePlanTrip = () => navigate('/criar-plano');
    const handleSeeDestinations = () => navigate('/home');

    if (loading) {
        return (
            <div className="m-10">
                <div className="text-center p-20 font-mono">
                    Carregando destino...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-10">
                <div className="text-center p-20 font-mono">
                    <span className="text-red-500">{error}</span>
                </div>
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="m-10">
                <div className="text-center p-20 font-mono">
                    Destino não encontrado.
                </div>
            </div>
        );
    }

    return (
        <div className="m-10 w-screen max-w-screen-xl xl:mx-auto">
            <section className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-mono font-extrabold">{destination.title}</h1>
                    <h4 className="text-gray-600 text-lg">{destination.locationName}</h4>
                </div>

                <div className="flex items-center gap-x-2">
                    <Button variant="outline" onClick={handleSeeDestinations}>
                        <Earth className="mr-2 h-4 w-4 text-[#223A60]" />
                        Explorar Destinos
                    </Button>
                    <Button onClick={handlePlanTrip}>
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Planejar Viagem
                    </Button>
                </div>
            </section>

            <section className="mt-8">
                <div className="flex h-[400px]">
                    <div className="w-1/2 bg-gray-200 mr-2 rounded-md">
                        {images.length > 0 && <img src={`${config.apiBaseUrl}${images[0].url}`} alt={`Imagem principal de ${destination.title}`} className="w-full h-full object-cover rounded-md"/>}
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-1/2 ml-2">
                        {images.slice(1, 5).map(image => (
                            <div key={image.id} className="bg-gray-200 rounded-md h-full w-full overflow-hidden">
                                <img src={`${config.apiBaseUrl}${image.url}`} alt={`Imagem de ${destination.title}`} className="w-full h-full object-cover rounded-md"/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Tabs defaultValue="overview" className="mt-10 w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="overview">
                        <BookOpen className="mr-2 h-4 w-4"/> Visão Geral
                    </TabsTrigger>
                    <TabsTrigger value="informacoes">
                        <Info className="mr-2 h-4 w-4"/> Informações Específicas
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                    <h2 className="text-2xl font-mono font-extrabold">Sobre {destination.title}</h2>
                    <p className="text-gray-800 break-words mt-4 leading-relaxed">
                        {destination.description}
                    </p>
                </TabsContent>

                <TabsContent value="informacoes" className="mt-1">
                    <h2 className="text-2xl font-mono font-extrabold">Informações</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 border rounded-lg">
                        <div>
                            <p className="font-semibold text-gray-700">Clima Local</p>
                            <p className="text-gray-900">{destination.localClimate || 'Não informado'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Fuso Horário</p>
                            <p className="text-gray-900">{destination.timeZone || 'Não informado'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Coordenadas</p>
                            <p className="text-gray-900">{`Latitude: ${destination.latitude}, Longitude: ${destination.longitude}`}</p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <Toaster />
        </div>
    );
}

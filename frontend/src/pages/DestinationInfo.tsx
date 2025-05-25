import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Heart, SquareArrowOutUpRight, CalendarPlus } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function DestinationInfo() {
    return (
        <main className="m-10 w-screen max-w-screen-xl xl:mx-auto">
            <section className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-mono font-extrabold">Rio de Janeiro</h1>
                    <h4 className="text-gray-600">Brasil</h4>
                </div>
                <div className="flex justify-between w-95">
                    <Button className="cursor-pointer" variant="outline" onClick={() => toast("Olaaaa")}>
                        <SquareArrowOutUpRight />Ver Mais
                    </Button>
                    <Button className="cursor-pointer" variant="outline">
                        <Heart /> Salvar
                    </Button>
                    <Button className="cursor-pointer">
                        <CalendarPlus />Planejar Viagem
                    </Button>
                </div>
            </section>
            <section className="mt-5">
                <div className="flex">
                    <div className="w-1/2 bg-gray-300 h-100 mr-2 rounded-md"></div>
                    <div className="grid grid-cols-2 gap-4 w-1/2 bg-white h-100 ml-2">
                        <div className="bg-gray-300 rounded-md"></div>
                        <div className="bg-gray-300 rounded-md"></div>
                        <div className="bg-gray-300 rounded-md"></div>
                        <div className="bg-gray-300 rounded-md"></div>
                    </div>
                </div>
            </section>
            <section className="flex mt-10 w-full">
                <Tabs defaultValue="tab-1" orientation="vertical" className="w-full">
                    <TabsList>
                        <TabsTrigger value="tab-1">Visao Geral</TabsTrigger>
                        <TabsTrigger value="tab-2">Hospedagens</TabsTrigger>
                        <TabsTrigger value="tab-3">Pontos Turisticos</TabsTrigger>
                        <TabsTrigger value="tab-4">Restaurantes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab-1">
                        <section className="w-full h-100 mr-2">
                            <h2 className="text-2xl font-mono font-extrabold">Sobre Rio de Janeiro</h2>
                            <p className="text-gray-800 break-words mt-2">
                            O Rio de Janeiro é uma das cidades mais conhecidas do Brasil, famosa por suas paisagens naturais, sua cultura vibrante e sua importância histórica. Localizado na região Sudeste do país, o Rio é cercado por montanhas, florestas e praias que atraem visitantes do mundo inteiro. O Cristo Redentor, uma das sete maravilhas do mundo moderno, fica no alto do morro do Corcovado e é um dos principais símbolos da cidade. A cidade também é marcada pelo Pão de Açúcar, que oferece uma vista panorâmica impressionante, e pelas praias de Copacabana e Ipanema, conhecidas por sua beleza e pelo estilo de vida descontraído.
                            </p>
                            <p className="text-gray-800 break-words mt-2">
                                Além de suas belezas naturais, o Rio tem uma rica herança cultural. O samba, o carnaval e as escolas de samba fazem parte da identidade carioca, refletindo a diversidade e a criatividade do povo. Durante o carnaval, a cidade se transforma com desfiles, festas e blocos de rua que reúnem milhões de pessoas. A vida urbana do Rio é intensa e contrastante, com regiões de grande desenvolvimento ao lado de áreas que enfrentam desafios sociais.</p>
                        </section>
                    </TabsContent>
                    <TabsContent value="tab-2">
                        <p className="text-muted-foreground p-4 text-center text-xs">
                            Content for Tab 2
                        </p>
                    </TabsContent>
                    <TabsContent value="tab-3">
                        <p className="text-muted-foreground p-4 text-center text-xs">
                            Content for Tab 3
                        </p>
                    </TabsContent>
                    <TabsContent value="tab-4">
                        <p className="text-muted-foreground p-4 text-center text-xs">
                            Content for Tab 4
                        </p>
                    </TabsContent>
                </Tabs>
            </section>
            <Toaster></Toaster>
        </main>
    );
}
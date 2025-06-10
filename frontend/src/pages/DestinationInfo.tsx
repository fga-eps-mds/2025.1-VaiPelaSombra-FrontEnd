import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Heart, SquareArrowOutUpRight, CalendarPlus, ChevronDownIcon, BookmarkPlus, Bookmark } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useId, useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function DestinationInfo() {

    const id = useId()
    const [inputValue, setInputValue] = useState("")
    const [isCreateListDialogOpen, setIsCreateListDialogOpen] = useState(false);
    const [isSaved, setIsSaved] = React.useState<Checked>(false);

    const toggleSave = () => {
        setIsSaved(prevIsSaved => !prevIsSaved);
        if (!isSaved) {
            toast.success("Destino salvo com sucesso!");
        } else {
            toast.info("Destino removido dos salvos.");
        }
    };

    return (
        <main className="m-10 w-screen max-w-screen-xl xl:mx-auto">
            <section className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-mono font-extrabold">Rio de Janeiro</h1>
                    <h4 className="text-gray-600">Brasil</h4>
                </div>
                <div className="flex justify-between w-104">
                    <Button className="cursor-pointer" variant="outline" onClick={() => toast.info("Destino salvo com sucesso!")}>
                        <SquareArrowOutUpRight />Ver Mais
                    </Button>
                    <div className="inline-flex -space-x-px rounded-md rtl:space-x-reverse">
                        <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 cursor-pointer" variant="outline" onClick={() => toggleSave()}>
                            <Heart
                                    className={`transition-colors duration-150 ${isSaved ? 'text-red-500' : 'text-current'}`} 
                                    fill={isSaved ? 'currentColor' : 'none'}
                                />
                            Salvar
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 cursor-pointer"
                                    variant="outline"
                                    size="icon"
                                    aria-label="Open link"
                                >
                                    <ChevronDownIcon size={16} aria-hidden="true" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuCheckboxItem 
                                    checked={isSaved}
                                    onCheckedChange={setIsSaved}
                                    className="[&>span:first-child]:hidden pl-2"
                                    >
                                    
                                    <Bookmark 
                                        size={16} aria-hidden="true" className={`text-black transition-colors duration-150 ${isSaved ? 'text-red-500' : 'text-current'}`} 
                                        fill={isSaved ? 'currentColor' : 'none'}/>
                                Favoritos
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem 
                                    checked={isSaved}
                                    onCheckedChange={setIsSaved}
                                    className="[&>span:first-child]:hidden pl-2"
                                    >
                                    
                                    <Bookmark 
                                        size={16} aria-hidden="true" className={`text-black transition-colors duration-150 ${isSaved ? 'text-red-500' : 'text-current'}`} 
                                        fill={isSaved ? 'currentColor' : 'none'}/>
                                Rumo a Xique-Xique
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem 
                                    checked={isSaved}
                                    onCheckedChange={setIsSaved}
                                    className="[&>span:first-child]:hidden pl-2"
                                    >
                                    
                                    <Bookmark 
                                        size={16} aria-hidden="true" className={`text-black transition-colors duration-150 ${isSaved ? 'text-red-500' : 'text-current'}`} 
                                        fill={isSaved ? 'currentColor' : 'none'}/>
                                RockInRio2077
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={() => setIsCreateListDialogOpen(true)}><BookmarkPlus size={16} className="text-black" aria-hidden="true" />Criar nova lista</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Button className="cursor-pointer">
                        <CalendarPlus />Planejar Viagem
                    </Button>
                </div>
            </section>
            <section className="mt-5">
                <div className="flex">
                    <div className="w-1/2 bg-gray-300 h-100 mr-2 rounded-md">
                        <img
                            src={'/src/assets/images/Imagen_de_los_canales_concéntricos_en_Ámsterdam.webp'}
                            alt="IMAGE1"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-1/2 bg-white h-100 ml-2">
                        <div className="bg-gray-300 rounded-md h-full w-full overflow-hidden">
                            <img
                                src={'/src/assets/images/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.webp'}
                                alt="IMAGE1"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <div className="bg-gray-300 rounded-md h-full w-full overflow-hidden">
                            <img
                                src={'/src/assets/images/hq720.jpg'}
                                alt="IMAGE1"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <div className="bg-gray-300 rounded-md h-full w-full overflow-hidden">
                            <img
                                src={'/src/assets/images/Paracas_National_Reserve._Ica,_Peru.webp'}
                                alt="IMAGE1"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <div className="bg-gray-300 rounded-md h-full w-full overflow-hidden">
                            <img
                                src={'/src/assets/images/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_août_2014_(2).webp'}
                                alt="IMAGE1"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex mt-10 w-full">
                <Tabs defaultValue="tab-1" orientation="vertical" className="w-full">
                    <TabsList>
                        <TabsTrigger value="tab-1" className="cursor-pointer">Visao Geral</TabsTrigger>
                        <TabsTrigger value="tab-2" className="cursor-pointer">Hospedagens</TabsTrigger>
                        <TabsTrigger value="tab-3" className="cursor-pointer">Pontos Turisticos</TabsTrigger>
                        <TabsTrigger value="tab-4" className="cursor-pointer">Restaurantes</TabsTrigger>
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
                        <section className="w-full h-100 mr-2">
                            Tab 2
                        </section>
                    </TabsContent>
                    <TabsContent value="tab-3">
                        <section className="w-full h-100 mr-2">
                            Tab 3
                        </section>
                    </TabsContent>
                    <TabsContent value="tab-4">
                        <section className="w-full h-100 mr-2">
                            Tab 4
                        </section>
                    </TabsContent>
                </Tabs>
            </section>

            <Dialog open={isCreateListDialogOpen} onOpenChange={setIsCreateListDialogOpen}>
                <DialogContent className="w-100">
                    <div className="flex flex-col items-start gap-2">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-mono font-bold">
                                Criar uma nova lista
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <form className="space-y-5">
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={id}>Nome da lista</Label>
                            <Input
                                id={id}
                                type="text"
                                placeholder="Digite o nome da lista"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className="flex-1 cursor-pointer">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                type="button"
                                className="flex-1 cursor-pointer"
                                disabled={inputValue.length == 0}
                            >
                                Criar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Toaster></Toaster>
        </main>
    );
}
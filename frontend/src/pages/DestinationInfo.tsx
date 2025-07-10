import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Heart, SquareArrowOutUpRight, CalendarPlus, ChevronDownIcon, BookmarkPlus, Bookmark } from "lucide-react";
import { Tabs,TabsContent,TabsList,TabsTrigger,} from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useParams } from 'react-router-dom';
import { Destination, NewList } from '../destination';

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function DestinationInfo() {
    const { destinationId } = useParams<{ destinationId: string }>();

    const [destination, setDestination] = useState<Destination | null>(null); 
    const [isLoadingDestination, setIsLoadingDestination] = useState(true);
    const [destinationError, setDestinationError] = useState<string | null>(null);

    const [isSaved, setIsSaved] = useState<Checked>(false);

    const [newListName, setNewListName] = useState("");
    const [isCreateListDialogOpen, setIsCreateListDialogOpen] = useState(false); 
    const [isCreatingList, setIsCreatingList] = useState(false); 

    useEffect(() => {
        if (!destinationId) {
            setDestinationError("ID do destino não fornecido na URL.");
            setIsLoadingDestination(false);
            return;
        }

        const fetchDestinationDetails = async () => {
            try {
                setIsLoadingDestination(true);
                setDestinationError(null); 
                const response = await fetch(`http://localhost:3000/api/destinations/${destinationId}`);

                if (!response.ok) {
                    throw new Error(`Erro ao buscar destino: ${response.status} - ${response.statusText}`);
                }

                const data: Destination = await response.json();

                setDestination(data);
                setIsSaved(data.isFavorited || false);

            } catch (error) {
                setDestinationError("Não foi possível carregar os detalhes do destino. Tente novamente.");
            } finally {
                setIsLoadingDestination(false);
            }
        };

        fetchDestinationDetails(); 
    }, [destinationId]); 
  
    const toggleSave = async () => {
        if (!destinationId) {
            toast.error("Erro: ID do destino ausente para salvar/remover.");
            return;
        }

        const newSavedState = !isSaved; 

        try {
            setIsSaved(newSavedState);

            const response = await fetch(`http://localhost:3000/api/favorites/toggle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    destinationId: parseInt(destinationId), 
                    action: newSavedState ? 'add' : 'remove', 
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao ${newSavedState ? 'salvar' : 'remover'} destino.`);
            }

            if (newSavedState) {
                toast.success("Destino salvo com sucesso!");
            } else {
                toast.info("Destino removido dos salvos.");
            }

        } catch (error) {
            setIsSaved(!newSavedState);
            toast.error(`Falha ao ${newSavedState ? 'salvar' : 'remover'} destino. Tente novamente.`);
        }
    };

    const handleCreateNewList = async () => {
        if (newListName.trim() === "") { 
            toast.error("O nome da lista não pode estar vazio.");
            return;
        }

        try {
            setIsCreatingList(true); 
            const response = await fetch(`http://localhost:3000/api/lists`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newListName,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao criar lista: ${response.status} - ${response.statusText}`);
            }

            const newList: NewList = await response.json(); 
            toast.success(`Lista "${newListName}" criada com sucesso!`);
            setNewListName("");
            setIsCreateListDialogOpen(false); 
        } catch (error) {
            toast.error(`Falha ao criar lista. Tente novamente.`);
        } finally {
            setIsCreatingList(false);
        }
    };

    if (isLoadingDestination) {
        return <main className="m-10 w-screen max-w-screen-xl xl:mx-auto"><div>Carregando detalhes do destino...</div></main>;
    }

    if (destinationError) {
        return <main className="m-10 w-screen max-w-screen-xl xl:mx-auto"><div>Erro: {destinationError}</div></main>;
    }

    if (!destination) {
        return <main className="m-10 w-screen max-w-screen-xl xl:mx-auto"><div>Nenhum destino encontrado para este ID.</div></main>;
    }

    return (
        <main className="m-10 w-screen max-w-screen-xl xl:mx-auto">
            <section className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-mono font-extrabold">{destination.name}</h1>
                    <h4 className="text-gray-600">{destination.location}</h4>
                </div>
                <div className="flex justify-between w-104">
                    <Button className="cursor-pointer" variant="outline" onClick={() => toast.info("Funcionalidade 'Ver Mais' futura.")}>
                        <SquareArrowOutUpRight />Ver Mais
                    </Button>
                    <div className="inline-flex -space-x-px rounded-md rtl:space-x-reverse">
                        <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 cursor-pointer" variant="outline" onClick={toggleSave}>
                            <Heart
                                className={`transition-colors duration-150 ${isSaved ? 'text-red-500' : 'text-current'}`}
                                fill={isSaved ? 'currentColor' : 'none'}
                            />
                            {isSaved ? 'Salvo' : 'Salvar'} 
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
                                    onCheckedChange={toggleSave}
                                    className="[&>span:first-child]:hidden pl-2"
                                >
                                    <Bookmark
                                        size={16} aria-hidden="true" className={`text-black transition-colors duration-150 ${isSaved ? 'text-red-500' : 'text-current'}`}
                                        fill={isSaved ? 'currentColor' : 'none'} />
                                    Favoritos
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={false} 
                                    className="[&>span:first-child]:hidden pl-2"
                                >
                                    <Bookmark size={16} aria-hidden="true" className="text-black" />
                                    Rumo a Xique-Xique
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={false}
                                    className="[&>span:first-child]:hidden pl-2"
                                >
                                    <Bookmark size={16} aria-hidden="true" className="text-black" />
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
                            src={destination.imageUrlMain}
                            alt={destination.name}        
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-1/2 bg-white h-100 ml-2">
                        {destination.imageUrlsGallery && destination.imageUrlsGallery.map((url, index) => (
                            <div key={index} className="bg-gray-300 rounded-md h-full w-full overflow-hidden">
                                <img
                                    src={url} 
                                    alt={`${destination.name} - Imagem ${index + 1}`} 
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                        ))}
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
                            <h2 className="text-2xl font-mono font-extrabold">Sobre {destination.name}</h2>
                            <p className="text-gray-800 break-words mt-2">
                                {destination.description}
                            </p>
                        </section>
                    </TabsContent>
                    <TabsContent value="tab-2">
                        <section className="w-full h-100 mr-2">
                            Tab 2 (Hospedagens) - O conteúdo aqui também viria do backend
                        </section>
                    </TabsContent>
                    <TabsContent value="tab-3">
                        <section className="w-full h-100 mr-2">
                            Tab 3 (Pontos Turísticos) - O conteúdo aqui também viria do backend
                        </section>
                    </TabsContent>
                    <TabsContent value="tab-4">
                        <section className="w-full h-100 mr-2">
                            Tab 4 (Restaurantes) - O conteúdo aqui também viria do backend
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
                            <Label htmlFor="newListNameInput">Nome da lista</Label> 
                            <Input
                                id="newListNameInput"
                                type="text"
                                placeholder="Digite o nome da lista"
                                value={newListName} 
                                onChange={(e) => setNewListName(e.target.value)} 
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className="flex-1 cursor-pointer" disabled={isCreatingList}>
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                type="button"
                                className="flex-1 cursor-pointer"
                                disabled={newListName.length === 0 || isCreatingList}
                                onClick={handleCreateNewList} 
                            >
                                {isCreatingList ? 'Criando...' : 'Criar'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Toaster />
        </main>
    );
}
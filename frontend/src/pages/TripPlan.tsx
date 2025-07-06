import { Calendar, MapPin, Clock, Users, DollarSign, NotebookText, NotebookPen, GitCommitVertical, Route, Star, Pencil, Ellipsis, Share, Share2Icon, ImageUpIcon, Edit, Trash2Icon, CheckIcon, CopyIcon } from "lucide-react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { act, useState, useId, useRef } from "react";
import { SideBar } from "@/components/SideBar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { TripPlan } from "@/types/trip-plan.type";
import { DeleteDialog } from "@/components/DeleteDialog"
import { BasicDialog } from "@/components/BasicDialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


export default function TripPlan() {

    const [activeSection, SetActiveSection] = useState<string>("")
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isInviteFriendsDialogOpen, setIsInviteFriendsDialogOpen] = useState(false);

    const id = useId()
    const [copied, setCopied] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        }
    }

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" })
            SetActiveSection(sectionId)
        }
    }

    interface sectionsProp {
        sectionId: number,
        label: string
    }

    const mockTrip: TripPlan = {
        id: 1,
        name: "Vamos para New York #Ferias2025",
        image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/104000/104059-New-York.jpg',
        ownerId: 101,
        notes: "Lembrar de levar protetor solar e verificar a previsão do tempo. Pesquisar restaurantes locais com boas avaliações. Comprar passagens com antecedência.",
        startDate: "2025-07-02T00:00:00.000Z",
        endDate: "2025-07-22T00:00:00.000Z",
        status: "Planejada",
        daysLeft: 361,
        destinationId: 42,
    };

    return (
        <div className="flex h-screen">

            <DeleteDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={() => console.log("teste")}
                title="Tem certeza que deseja deletar o plano de viagem?"
                description="Tenha em mente que uma vez deletado, essa acao nao pode ser desfeita."
            />

            <BasicDialog
                open={isInviteFriendsDialogOpen}
                onOpenChange={setIsInviteFriendsDialogOpen}
                title="Convide amigos para o seu plano de viagem"
                description="Basta que os membros entre no link para participar do seu plano!"
                children={
                    <div className="*:not-first:mt-2">
                        <div className="relative">
                            <Input
                                ref={inputRef}
                                id={id}
                                className="pe-9"
                                type="text"
                                defaultValue="pnpm install origin-ui"
                                readOnly
                            />
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={handleCopy}
                                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                            aria-label={copied ? "Copied" : "Copy to clipboard"}
                                            disabled={copied}
                                        >
                                            <div
                                                className={cn(
                                                    "transition-all",
                                                    copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                                )}
                                            >
                                                <CheckIcon
                                                    className="stroke-emerald-500"
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div
                                                className={cn(
                                                    "absolute transition-all",
                                                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                                                )}
                                            >
                                                <CopyIcon size={16} aria-hidden="true" />
                                            </div>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="px-2 py-1 text-xs">
                                        Copiar link
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                }
            />

            <SideBar onScrollToSection={scrollToSection}></SideBar>

            <main className="flex-col w-180 bg-white overflow-y-auto no-scrollbar shadow-[10px_0px_15px_-3px_rgba(0,0,0,0.1)] z-10">

                <div className="h-50 relative">
                    <img
                        src={'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/104000/104059-New-York.jpg'}
                        alt="Trip plan image"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="outline" aria-label="Select theme" className="opacity-90 shadow-lg shadow-black-950 cursor-pointer hover:opacity-100">
                                    <Ellipsis size={16} aria-hidden="true" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="min-w-32">
                                <DropdownMenuItem onClick={() => console.log("teste")}>
                                    <Edit size={16} className="opacity-60" aria-hidden="true" />
                                    <span>Editar plano</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log("teste")}>
                                    <ImageUpIcon size={16} className="opacity-60" aria-hidden="true" />
                                    <span>Mudar imagem</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsInviteFriendsDialogOpen(true)}>
                                    <Share2Icon size={16} className="opacity-60" aria-hidden="true" />
                                    <span>Convidar amigos</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                                    <Trash2Icon size={16} aria-hidden="true" />
                                    <span>Deletar plano</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="flex flex-col p-8">
                    <h1 className="text-3xl font-extrabold tracking-tight font-mono">{mockTrip.name}</h1>

                    <section id="resumo" className="pt-8">
                        <Accordion type="multiple" defaultValue={["resumo"]}>
                            <AccordionItem value="resumo" className="border-b-0 rounded-md border px-4 py-1 last:border-b">
                                <AccordionTrigger className="justify-start items-center gap-3 py-2 text-[15px] hover:no-underline">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <MapPin className="h-5 w-5" />
                                        <h3 className="text-2xl font-bold tracking-tight font-mono">Resumo</h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="ps-3">
                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-[16px] text-gray-700">Destino</span>
                                            <span className="text-[18px] text-gray-950">Xique-Xique</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-[16px] text-gray-700">Duracao</span>
                                            <span className="text-[18px] text-gray-950">20 dias</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-[16px] text-gray-700">Datas</span>
                                            <span className="text-[18px] text-gray-950">exemplo</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-[16px] text-gray-700">Tipo de viagem</span>
                                            <span className="text-[18px] text-gray-950">exemplo</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-[16px] text-gray-700">Status</span>
                                            <span className="text-[18px] text-gray-950">exemplo</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-[16px] text-gray-700">Tempo restante</span>
                                            <span className="text-[18px] text-gray-950">exemplo</span>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                    <section id="notas" className="pt-8">
                        <Accordion type="multiple" defaultValue={["notas"]}>
                            <AccordionItem value="notas" className="border-b-0 rounded-md border px-4 py-1 last:border-b">
                                <AccordionTrigger className="justify-start items-center gap-3 py-2 text-[15px] hover:no-underline">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <NotebookPen className="h-5 w-5" />
                                        <h3 className="text-2xl font-bold tracking-tight font-mono">Notas</h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Textarea placeholder="Escreva suas anotacoes de viagem aqui" value={mockTrip.notes} className="w-150 p-5 m-1" />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                    <Separator className="mt-12"></Separator>

                    <h2 className="text-3xl font-extrabold tracking-tight font-mono pt-8">Itinerário</h2>

                    <section id="qua" className="pt-8">
                        <Accordion type="multiple" defaultValue={["qua"]}>
                            <AccordionItem value="qua" className="rounded-md border px-4 py-2 last:border-b">
                                <AccordionTrigger className="justify-start items-center gap-3 py-2 text-[15px] leading-6 hover:no-underline">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Route className="h-5 w-5" />
                                        <h3 className="text-2xl font-bold tracking-tight font-mono">Quarta-feira, 2 de julho de 2025</h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="">

                                    <Accordion type="multiple" defaultValue={["iti"]}>
                                        <AccordionItem value="iti" className="rounded-md border mt-2 px-4 last:border-b">
                                            <AccordionTrigger className="justify-start items-center gap-3 py-2 text-[15px] leading-6 hover:no-underline">
                                                <div className="flex items-center gap-2 font-semibold">
                                                    <Star className="h-5 w-5" />
                                                    <h3 className="text-[15px] font-semibold tracking-tight font-mono">Atividade teste</h3>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="">
                                                <span className="text-gray-600 text-[16px]">Igreja da Matriz, Xique-Xique - BA</span>


                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    <Button variant={"outline"} className="w-full mt-5 bg-blue-50">Criar uma nova atividade</Button>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                </div>
            </main>
            <aside className="flex-1 bg-blue-200"></aside>
        </div>
    )
}
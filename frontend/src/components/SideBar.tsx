import { Calendar, MapPin, Clock, Users, DollarSign, NotebookText, NotebookPen, Info, Eye, GitCommitVertical, Route } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";

interface SideBarProps {
    onScrollToSection: (sectionId: string) => void;
}

export function SideBar({ onScrollToSection }: SideBarProps) {
    return (
        <aside className="h-full w-50 border-r border-gray-300 bg-gray-50 p-4 overflow-y-auto">
            <Accordion type="multiple" defaultValue={["visaoGeral", "itinerario"]}>
                <AccordionItem value="visaoGeral" className="border-b-0">
                    <AccordionTrigger className="flex hover:no-underline justify-center items-center cursor-pointer">
                        <div className="flex items-center gap-2 w-full font-semibold">
                            <Eye className="h-5 w-5" />
                            <span className="text-lg">Visão Geral</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Button variant={"ghost"} className=" cursor-pointer text-base text-gray-700" onClick={() => onScrollToSection("resumo")}>
                            <MapPin />
                            Resumo
                        </Button>
                        <Button variant={"ghost"} className="cursor-pointer text-lg text-gray-700" onClick={() => onScrollToSection("notas")}>
                            <NotebookPen />
                            Notas
                        </Button>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="itinerario" className="border-b-0">
                    <AccordionTrigger className="flex hover:no-underline justify-center items-center cursor-pointer">
                        <div className="flex items-center gap-2 w-full font-semibold">
                            <Calendar className="h-5 w-5" />
                            <span className="text-lg">Itinerário</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Button variant={"ghost"} className="cursor-pointer text-base text-gray-700 py-5">
                            <Route></Route>
                            Qua 2/7
                        </Button>
                        <Button variant={"ghost"} className="cursor-pointer text-base text-gray-700 py-5">
                            <Route></Route>
                            Qui 3/7
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}
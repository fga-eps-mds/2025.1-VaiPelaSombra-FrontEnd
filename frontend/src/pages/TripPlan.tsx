import { Calendar, MapPin, Clock, Users, DollarSign, NotebookText, NotebookPen } from "lucide-react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function TripPlan() {

    const [activeSection, SetActiveSection] = useState<string>("");

    const scrollToSection = (sectionId : string) => {
        const element = document.getElementById(sectionId);
        if (element) { 
            element.scrollIntoView({behavior: "smooth", block: "start"});
            SetActiveSection(sectionId);
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-50 border-r border-gray-300 h-full bg-gray-50 p-4 overflow-y-auto">
                <Accordion type="multiple" defaultValue={["visaoGeral"]}>
                    <AccordionItem value="visaoGeral" className="border-b-0">
                        <AccordionTrigger className="flex hover:no-underline justify-center items-center cursor-pointer">
                            <div className="flex items-center gap-2 w-full font-semibold">
                                <span className="text-lg">Visão Geral</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Button variant={"ghost"} className="cursor-pointer text-lg text-gray-700" onClick={() => scrollToSection("oi")}>Notas</Button>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="itinerario" className="border-b-0">
                        <AccordionTrigger className="flex hover:no-underline justify-center items-center cursor-pointer">
                            <div className="flex items-center gap-2 w-full font-semibold">
                                <span className="text-lg">Itinerário</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Button variant={"ghost"} className="cursor-pointer text-lg text-gray-700 py-5">Qua 2/7</Button>
                            <Button variant={"ghost"} className="cursor-pointer text-lg text-gray-700 py-5">Qui 3/7</Button>
                            <Button variant={"ghost"} className="cursor-pointer text-lg text-gray-700 py-5">Sex 4/7</Button>
                            <Button variant={"ghost"} className="cursor-pointer text-lg text-gray-700 py-5">Sáb 5/7</Button>
                            <Button variant={"ghost"} className="cursor-pointer text-lg text-gray-700 py-5">Dom 6/7</Button>
                            <Button variant={"ghost"} className="cursor-pointer text-lg text-gray-700 py-5">Seg 7/7</Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>


            <div className="flex-1 bg-white overflow-y-auto">
                <div className="h-50 bg-amber-700">
                    <img
                        src={'/src/assets/images/hq720.jpg'}
                        alt="IMAGE1"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col p-8 gap-10">
                    <h1 className="text-3xl font-extrabold tracking-tight font-mono">Vamos para Xique-Xique #Ferias2025</h1>

                    <section id="notas">
                        <Accordion type="multiple" defaultValue={["notas"]}>
                        <AccordionItem id="oi" value="notas" className="border-b-0 bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]">
                            <AccordionTrigger className="justify-start items-center gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                                <div className="flex items-center gap-2 font-semibold">
                                    <NotebookPen className="h-5 w-5"></NotebookPen>
                                    <h2 className="text-2xl font-bold tracking-tight font-mono">Notas</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="ps-3">
                                <span>Alguma coisa</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    </section>

                    <div className="h-300 w-30 bg-gray-400">
                        Teste
                    </div>

                </div>
            </div>
            <div className="w-110 bg-black">Coluna 3</div>
        </div>
    );
}
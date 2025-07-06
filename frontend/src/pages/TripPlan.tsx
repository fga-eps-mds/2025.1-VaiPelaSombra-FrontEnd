import { Calendar, MapPin, Clock, Users, DollarSign, NotebookText, NotebookPen, GitCommitVertical, Route, Star } from "lucide-react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { act, useState } from "react";
import { SideBar } from "@/components/SideBar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { TripPlan } from "@/types/trip-plan.type";


export default function TripPlan() {

    const [activeSection, SetActiveSection] = useState<string>("")

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

    return (
        <div className="flex h-screen">
            <SideBar onScrollToSection={scrollToSection}></SideBar>

            <main className="flex-col w-180 bg-white overflow-y-auto shadow-[10px_0px_15px_-3px_rgba(0,0,0,0.1)] z-10">
                <div className="h-50 bg-amber-700">
                    <img
                        src={'/src/assets/images/hq720.jpg'}
                        alt="Trip plan image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col p-8">
                    <h1 className="text-3xl font-extrabold tracking-tight font-mono">Vamos para Xique-Xique #Ferias2025</h1>

                    <section id="resumo" className="pt-8">
                        <Accordion type="multiple" defaultValue={["resumo"]}>
                            <AccordionItem value="notas" className="border-b-0 rounded-md border px-4 py-1 last:border-b">
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
                                <AccordionContent className="ps-3">
                                    <span>Alguma coisa</span>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                    <Separator className="mt-12"></Separator>

                    <h2 className="text-3xl font-extrabold tracking-tight font-mono pt-8">Itinerário</h2>

                    <section id="notass" className="pt-8">
                        <Accordion type="multiple" defaultValue={["notas"]}>
                            <AccordionItem value="notas" className="rounded-md border px-4 py-2 last:border-b">
                                <AccordionTrigger className="justify-start items-center gap-3 py-2 text-[15px] leading-6 hover:no-underline">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Route className="h-5 w-5" />
                                        <h3 className="text-2xl font-bold tracking-tight font-mono">Quarta-feira, 2 de julho de 2025</h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="">
                                    <span className="text-gray-600 text-[16px]">Igreja da Matriz, Xique-Xique - BA</span>

                                    <Accordion type="multiple" defaultValue={["notas"]}>
                                        <AccordionItem value="notas" className="rounded-md border mt-5 px-4 last:border-b">
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
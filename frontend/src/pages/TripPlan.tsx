import { NotebookPen } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SideBar } from '@/components/SideBarLayout';

export default function TripPlan() {
  // Removed unused activeSection state

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Removed SetActiveSection since activeSection is unused
    }
  };

  return (
    <div className="flex h-screen">
      <SideBar onScrollToSection={scrollToSection}></SideBar>

      <div className="flex-1 bg-white overflow-y-auto">
        <div className="h-50 bg-amber-700">
          <img
            src={'/src/assets/images/hq720.jpg'}
            alt="IMAGE1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col p-8 gap-10">
          <h1 className="text-3xl font-extrabold tracking-tight font-mono">
            Vamos para Xique-Xique #Ferias2025
          </h1>

          <section id="notas">
            <Accordion type="multiple" defaultValue={['notas']}>
              <AccordionItem
                id="oi"
                value="notas"
                className="border-b-0 bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
              >
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

          <div className="h-300 w-30 bg-gray-400">Teste</div>
        </div>
      </div>
      <div className="w-110 bg-black">Coluna 3</div>
    </div>
  );
}

import SignupForm from "@/components/auth/SignupForm";
import { FullScreenLayout } from "@/components/layouts/FullScreenLayout";
import { Toaster } from "sonner";
import Imagem1 from "@/assets/imagem1.jpg";
import Imagem2 from "@/assets/imagem2.png";

export default function Signup() {

    return (
        <FullScreenLayout>

            <div className="relative flex justify-center items-center w-1/2 h-screen">

                <div className={"absolute inset-0 bg-cover bg-center opacity-10 z-0 bg-emerald-50"}
                    style={{ backgroundImage: `url('${Imagem2}')` }}></div>

                <div className="relative z-10">
                    <SignupForm />
                </div>
            </div>

            <div className={"w-1/2 bg-cover bg-center bg-no-repeat"}
                style={{ backgroundImage: `url('${Imagem1}')` }}>
                <Toaster />
            </div>
        </FullScreenLayout>
    )
}
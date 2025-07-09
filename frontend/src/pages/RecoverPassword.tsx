import RecoverPasswordForm from "@/components/auth/RecoverPasswordForm";
import { FullScreenLayout } from "@/components/layouts/FullScreenLayout";
import { Toaster } from "sonner";
import Imagem2 from "@/assets/imagem2.png";


export default function RecoverPassword() {
    return (
        <FullScreenLayout className="relative z-0 justify-center items-center" >
            <div className={"absolute inset-0 bg-cover bg-center opacity-10 z-0"}
                style={{ backgroundImage: `url('${Imagem2}')` }}></div>

            <div className="relative z-10">
                <RecoverPasswordForm />
                <Toaster />
            </div>

        </FullScreenLayout>
    )
}
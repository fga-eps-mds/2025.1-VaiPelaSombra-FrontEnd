import SignupForm from "@/components/auth/SignupForm";
import { FullScreenLayout } from "@/components/layouts/FullScreenLayout";

export default function Signup() {
    return (
        <FullScreenLayout>

            <div className="relative flex justify-center items-center w-1/2 h-screen overflow-hidden">

                <div className="absolute inset-0 bg-[url('@/assets/imagem2.png')] bg-cover bg-center opacity-10 z-0 bg-emerald-50"></div>

                <div className="relative z-10">
                    <SignupForm>
                    </SignupForm>
                </div>
            </div>

            <div className="w-1/2 bg-[url('@/assets/imagem1.jpg')] bg-cover bg-center bg-no-repeat" />

        </FullScreenLayout>
    )
}
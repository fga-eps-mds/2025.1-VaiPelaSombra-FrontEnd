import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Signup() {
    return (
        <div className="flex max-w-screen h-scree">

            <div className="relative flex justify-center items-center w-1/2 h-screen overflow-hidden">

                <div className="absolute inset-0 bg-[url('@/assets/imagem2.png')] bg-cover bg-center opacity-30 z-0"></div>

                <div className="relative z-10">
                    <CardWithForm />
                </div>
            </div>
            <div className="w-1/2 p-15" style={{ backgroundColor: '#EAF0F0' }}>
                <Card className="w-full h-full bg-[url('@/assets/imagem1.jpg')] bg-cover bg-center bg-no-repeat" />
            </div>

        </div>
    )
}

export function CardWithForm() {
    return (
        <Card className="w-100">
            <CardHeader>
                <CardTitle className="text-3xl">Crie uma conta</CardTitle>
                <CardDescription>Crie a sua conta ja!</CardDescription>
            </CardHeader>
            <CardContent>
                <form>

                    <div className="grid w-full items-center gap-4">

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input required id="name" placeholder="Digite o seu nome completo" type="text" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input required id="email" placeholder="fulano@email.com" type="email" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="senha">Senha</Label>
                            <Input required id="senha" placeholder="Sua senha" type="password" />
                        </div>

                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col w-full gap-4">
                <Button className="w-full" type="submit" style={{ backgroundColor: '#223A60' }}>Criar uma conta</Button>

                <div className="flex items-center w-full gap-4">
                    <Separator className="flex-1 h-px bg-border" />
                    <span className="text-sm text-muted-foreground">OU</span>
                    <Separator className="flex-1 h-px bg-border" />
                </div>

                <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                        />
                    </svg>
                    Inscrever-se com Google
                </Button>
            </CardFooter>
        </Card>
    )
}

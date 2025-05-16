import { useState } from "react"
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
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
    return (
        <div className="flex w-full h-screen">

            <div className="relative flex justify-center items-center w-1/2 h-screen overflow-hidden">

                <div className="absolute inset-0 bg-[url('@/assets/imagem2.png')] bg-cover bg-center opacity-10 z-0"></div>

                <div className="relative z-10">
                    <CardWithForm />
                </div>
            </div>

            <div className="w-1/2 bg-[url('@/assets/imagem1.jpg')] bg-cover bg-center bg-no-repeat" />

        </div>
    )
}

export function CardWithForm() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [verSenha, setVerSenha] = useState(false);
    const [confirmarverSenha, setConfirmarVerSenha] = useState(false);
    const [erro, setErro] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isEmpty = (value: string): boolean => value.trim() === '';

    const isValidEmail = (email: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPassword = (password: string): boolean =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    const isMatch = (a: string, b: string): boolean => a === b;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');

        if (isEmpty(username)) return setErro("Nome é obrigatório");
        if (!isValidEmail(email)) return setErro("E-mail inválido");
        if (!isValidPassword(password)) return setErro("Senha fraca (mín. 8 caracteres, letras e números)");
        if (!isMatch(password, confirmpassword)) return setErro("As senhas não coincidem");

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSuccessMessage('Cadastro realizado com sucesso!');
    };

    

    return (
        <Card className="w-100">
            <CardHeader>
                <CardTitle className="text-3xl">Crie uma conta</CardTitle>
                <CardDescription>Crie a sua conta já!</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>

                <CardContent className="mb-4">
                    <div className="grid w-full items-center gap-4">

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input required id="name" placeholder="Digite o seu nome completo" type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            {erro === "nome" && <p className="text-red-500 text-sm mt-1">Preencha o nome completo.</p>}

                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input required id="email" placeholder="Digite o seu email" type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            {erro === "email" && <p className="text-red-500 text-sm mt-1">Email inválido.</p>}

                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="senha">Senha</Label>
                            <div className="relative">
                                <Input className="pr-10" required id="senha" placeholder="Digite a sua senha" type={verSenha ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />

                                <button
                                    type="button"
                                    onClick={() => setVerSenha((prev) => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                    {verSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {erro === "senha" && <p className="text-red-500 text-sm mt-1">Senha deve ter pelo menos 6 caracteres.</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">

                            <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                            <div className="relative">
                                <Input
                                    className="pr-10"
                                    required
                                    id="confirmarSenha"
                                    placeholder="Digite a senha novamente"
                                    type={confirmarverSenha ? "text" : "password"}
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmarVerSenha((prev) => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {confirmarverSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {erro === "confirmarsenha" && <p className="text-red-500 text-sm mt-1">As senhas não coincidem.</p>}
                        </div>


                    </div>

                </CardContent>
                <CardFooter className="flex flex-col w-full gap-4">
                    <Button
                        type="submit"
                        className="w-full bg-[#223A60] hover:bg-[#2F4A80] text-white transition-colors cursor-pointer">   
                    </Button>
                    <div className="flex items-center w-full gap-4">
                        <Separator className="flex-1 h-px bg-border" />
                        <span className="text-sm text-muted-foreground">OU</span>
                        <Separator className="flex-1 h-px bg-border" />
                    </div>

                </CardFooter>
            </form>
            {successMessage && (
            <div style={{ color: 'green', margin: '16px', textAlign: 'center' }}>
                {successMessage}
            </div>
        )}
        </Card>
    )
}

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CardForm from "./CardForm";
import { SignupSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { CircleCheckIcon } from "lucide-react";
import { z } from "zod";
import axios from "axios";

export default function SignupForm() {

        const form = useForm({
            resolver: zodResolver(SignupSchema),
            defaultValues: {
                fullname: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
        });

        function onSubmit(data: z.infer<typeof SignupSchema>) {
            // dados para o backend
            const payload = {
                name: data.fullname,
                email: data.email,
                password: data.password,
                profileBio: "string",
                profileImage: "https://example.com/profile.jpg"
            }

            axios.post("http://localhost:3000/users", payload)
                .then(response => {
                    toast("Usuário cadastrado com sucesso!", {
                        icon: <CircleCheckIcon className="text-emerald-500 w-5 h-5" />,
                    });
                    console.log(response.data);
                    // Aqui você pode redirecionar ou limpar o formulário se quiser
                })
                .catch(error => {
                    const msg = error.response?.data?.message || "Erro ao cadastrar usuário.";
                    toast(msg, { icon: "❌" });
                });
        }

    return (
        <CardForm
        title="Crie sua conta"
        description="Crie uma conta para acessar todos os recursos."
        hyperlinkText="Já tem uma conta? Clique aqui!"
        linkTo="login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome completo</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Digite seu nome completo"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Digite seu email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Digite sua senha"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmação de senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirme sua senha"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-2 cursor-pointer">Criar uma conta</Button>
                    </div>
                </form>
            </Form>
        </CardForm>
    );
}
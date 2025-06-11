import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import CardForm from "./CardForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecoverPasswordSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { CircleCheckIcon } from "lucide-react";

export default function RecoverPasswordForm() {
    const form = useForm({
        resolver: zodResolver(RecoverPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof RecoverPasswordSchema>) {
        console.log('Função onSubmit chamada com os dados:', data); // Log de entrada na função

        try {
            const response = await fetch(`/api/emailRoute?email=${encodeURIComponent(data.email)}`, {
                method: "GET",
            });

            console.log('Resposta completa do backend:', response); // Log da resposta completa

            if (response.ok) {
                const successMessage = await response.json();
                console.log('Mensagem de sucesso:', successMessage); // Log da mensagem de sucesso
                toast(`Email enviado com sucesso para ${data.email}`, {
                    icon: <CircleCheckIcon className="text-emerald-500 w-5 h-5" />,
                });
            } else {
                const error = await response.json();
                console.error('Erro retornado pelo backend:', error); // Log do erro retornado
                toast(`Erro: ${error.error}`, {
                    icon: <CircleCheckIcon className="text-red-500 w-5 h-5" />,
                });
            }
        } catch (error) {
            console.error('Erro inesperado ao enviar o email:', error); // Log de erro inesperado
            const errorMessage =
                error instanceof Error ? error.message : "Erro inesperado ao enviar o email.";
            toast(`Erro ao enviar email: ${errorMessage}`, {
                icon: <CircleCheckIcon className="text-red-500 w-5 h-5" />,
            });
        }
    }

    return (
        <CardForm
            title="Recupere a sua conta"
            description="Digite um email para recuperar"
            hyperlinkText="Voltar para tela de Login"
            linkTo="login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-3">
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
                        <Button type="submit" className="w-full mt-2 cursor-pointer">
                            Enviar Link
                        </Button>
                    </div>
                </form>
            </Form>
        </CardForm>
    );
}
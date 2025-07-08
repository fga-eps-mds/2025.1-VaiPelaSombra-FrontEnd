import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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

    function onSubmit(data: z.infer<typeof RecoverPasswordSchema>) {
        //Chamar o endpoint que faz a recuperação de senha enviando o email no corpo
        toast(JSON.stringify(data), {
            icon: <CircleCheckIcon className="text-emerald-500 w-5 h-5" />,
        });
    }

    return (
        <CardForm
            title="Recupere a sua conta"
            description="Digite um email para recuperar"
            hyperlinkText="Voltar para tela de Login"
            linkTo="login" >
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
                        <Button type="submit" className="w-full mt-2 cursor-pointer">Enviar Link</Button>
                    </div>
                </form>
            </Form>
        </CardForm>
    )
}
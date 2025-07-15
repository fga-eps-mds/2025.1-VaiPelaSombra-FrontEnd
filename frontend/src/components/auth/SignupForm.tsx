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
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import EyeToggle from "../ui/eye_toggle";
import SuccessModal from "../ui/sucessModal";
import { config } from "@/config";

export default function SignupForm() {
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const [showModal, setShowModal] = useState(false)

        const form = useForm<z.infer<typeof SignupSchema>>({
            resolver: zodResolver(SignupSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
        });

        const { isSubmitting } = form.formState;

        async function onSubmit(data: z.infer<typeof SignupSchema>) {
          try {
            const payload = {
              name: data.name,
              email: data.email,
              password: data.password,
            };

            await axios.post(`${config.apiBaseUrl}/users`, payload);

            form.reset();
            setShowModal(true)

          } catch (error: unknown) {
            let message = "Ocorreu um erro. Tente novamente.";

            if (axios.isAxiosError(error) && error.response?.data?.message) {
              message = error.response.data.message;


              if (message.includes('A record with this unique field already exists')) {
                message = 'Email já cadastrado.';
              }
            }

            toast.error(message);
          }
        }

    return (
      <>
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome completo</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
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
                                            disabled={isSubmitting}
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
                                    <div className="relative">
                                      <FormControl>
                                          <Input
                                              disabled={isSubmitting}
                                              type={showPassword ? "text" : "password"}
                                              placeholder="Digite sua senha"
                                              {...field}
                                          />
                                      </FormControl>
                                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <EyeToggle
                                          visible={showPassword}
                                          toggleVisibility={() => setShowPassword((prev) => !prev)}
                                        />
                                      </div>
                                  </div>
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
                                    <div className="relative">
                                      <FormControl>
                                          <Input
                                              disabled={isSubmitting}
                                              type={showConfirmPassword ? "text" : "password"}
                                              placeholder="Confirme sua senha"
                                              {...field}
                                          />
                                      </FormControl>
                                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <EyeToggle
                                          visible={showConfirmPassword}
                                          toggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
                                        />
                                      </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-2 cursor-pointer"
                          disabled={isSubmitting}>
                          {isSubmitting ? 'Criando conta...' : 'Criar uma conta'}
                        </Button>
                    </div>
                </form>
            </Form>
          </CardForm>

            <SuccessModal open={showModal} onClose={() => setShowModal(false)} />
          </>
    );
}

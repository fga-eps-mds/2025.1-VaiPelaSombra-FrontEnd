import * as z from 'zod';

export const SignupSchema = z.object({
    fullname: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').nonempty('Nome é obrigatório'),
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória'),
    confirmPassword: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').nonempty('Confirmação de senha é obrigatória')
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ['confirmPassword'],
    });
import * as z from 'zod';

export const SignupSchema = z.object({
    fullname: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(350, 'Nome deve ter no maximo 350 caracteres').nonempty('Nome é obrigatório').regex(/^[a-zA-ZÀ-ÿ '-]+$/, { message: 'Nome deve conter apenas letras, espaços, apóstrofos ou hífens. Números não são permitidos.' }),
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória'),
    confirmPassword: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').nonempty('Confirmação de senha é obrigatória')
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ['confirmPassword'],
    });
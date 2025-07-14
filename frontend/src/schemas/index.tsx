import * as z from 'zod';

const passwordSchema = z.string().superRefine((val, ctx) => {
  const requirements = [
    { regex: /.{8,}/, message: 'Senha deve ter pelo menos 8 caracteres' },
    { regex: /[A-Z]/, message: 'Deve conter pelo menos uma letra maiúscula' },
    { regex: /[a-z]/, message: 'Deve conter pelo menos uma letra minúscula' },
    { regex: /[0-9]/, message: 'Deve conter pelo menos um número' },
    { regex: /[^A-Za-z0-9]/, message: 'Deve conter pelo menos um caractere especial' },
    { regex: /^\S*$/, message: 'Não pode conter espaços' },
  ];

  requirements.forEach((req) => {
    if (!req.regex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: req.message,
      });
    }
  });
});

export const SignupSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(350, 'Nome deve ter no maximo 350 caracteres').nonempty('Nome é obrigatório').regex(/^[a-zA-ZÀ-ÿ '-]+$/, { message: 'Nome deve conter apenas letras, espaços, apóstrofos ou hífens. Números não são permitidos.' }),
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: passwordSchema,
    confirmPassword: z.string().nonempty('Confirmação de senha é obrigatória')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ['confirmPassword'],
    });

export const RecoverPasswordSchema = z.object({
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
});

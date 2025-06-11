//cria de envio de email. "https://react.email" "https://www.youtube.com/watch?v=D4pS4b9-DgA" 6:00 -> END "https://react.email/docs/integrations/resend"
//serve para mandar em si. ele faz os "gets e posts" com base no backend
//verifcacoes devem ser feitas na pagina principal, mas um caso de erro nao fará mal
//deve-se mandar um link de acesso para o id atrelado ao email fornecido, com base no email, gere um link para x id
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import AccessTokenEmail from 'src/components/emails/emailLayout';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  try {
    console.log('Requisição recebida:', request.url); // Log inicial da requisição

    const { searchParams } = new URL(request.url);
    const toEmail = searchParams.get('email');

    if (!toEmail) {
      console.error('Erro: O parâmetro "email" é obrigatório.');
      return NextResponse.json(
        { error: 'O parâmetro "email" é obrigatório.' },
        { status: 400 }
      );
    }

    console.log('Email recebido:', toEmail); // Log do email recebido

    const userResponse = await fetch(
      `http://localhost:3000/users?email=${toEmail}`
    );

    if (!userResponse.ok) {
      console.error(
        'Erro ao buscar o usuário pelo email:',
        userResponse.statusText
      );
      return NextResponse.json(
        { error: 'Erro ao buscar o usuário pelo email.' },
        { status: 500 }
      );
    }

    const userData = await userResponse.json();
    const userId = userData?.id;

    if (!userId) {
      console.error('Erro: Usuário não encontrado para o email fornecido.');
      return NextResponse.json(
        { error: 'Usuário não encontrado para o email fornecido.' },
        { status: 404 }
      );
    }

    const userLink = `https://www.example.com/${userId}`;
    console.log('Dados do usuário:', userData); // Log dos dados do usuário
    console.log('Link gerado:', userLink); // Log do link gerado

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
      subject: 'Link de entrada',
      react: AccessTokenEmail({ email: toEmail, link: userLink }),
    });

    console.log(`E-mail enviado com sucesso para ${toEmail}`); // Log de sucesso

    return NextResponse.json({
      message: `E-mail enviado com sucesso para ${toEmail}`,
      status: 'Ok',
    });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error); // Log de erro
    return NextResponse.json(
      { error: 'Ocorreu um erro ao enviar o e-mail.' },
      { status: 500 }
    );
  }
}
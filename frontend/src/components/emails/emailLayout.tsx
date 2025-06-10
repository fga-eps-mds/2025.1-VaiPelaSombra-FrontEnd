//cria a parte visual do email. "https://react.email" "https://www.youtube.com/watch?v=D4pS4b9-DgA" 00 -> 6:00
//usar uma layout ja pronto no site do react email e modifica-lo para o contexto
//esta pagina serve apenas como uma "pagina" visual que o usuario receberá
//verificaçoes e ter certeza que o email esta correto, deve ser um trabalho para a pagina em si, por mais que um caso de erro nao seja pecado, porem isso sera feito em routes, aqui só é uma area visual.
// o template usado foi o do github. levemente modificado.
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface AccessTokenEmailProps {
  email: string;
  link: string;
}

const baseUrl = 'http://localhost:3000';

export const AccessTokenEmail = ({
  link,
}: AccessTokenEmailProps) => {
  const fullLink = link.startsWith('http') ? link : `${baseUrl}/${link}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Clicking the button will give you access to your profile, please change your password as soon as possible
        </Preview>
        <Container style={container}>
          <Section style={section}>
            <Text style={text}>
              Clicking the button will give you access to your profile, please change your password as soon as possible.
            </Text>

            <Button style={button} href={fullLink}>
              Click to Enter
            </Button>
          </Section>

          <Text style={footer}>Vai pela Sombra</Text>
        </Container>
      </Body>
    </Html>
  );
};

AccessTokenEmail.PreviewProps = {
  email: 'example@example.com',
  link: '123',
} as AccessTokenEmailProps;

export default AccessTokenEmail;

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center' as const,
};

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
};

const button = {
  fontSize: '14px',
  backgroundColor: '#28a745',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '12px 24px',
  textDecoration: 'none',
};

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '60px',
};

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login'; 

// --- Mocks ---

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate, 
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock do AuthContext
const mockLogin = jest.fn();
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

// Mock do EyeToggle
jest.mock('../components/ui/eye_toggle', () => ({
  __esModule: true,
  default: ({ visible, toggleVisibility }: { visible: boolean; toggleVisibility: () => void }) => (
    <div data-testid="eye-toggle" onClick={toggleVisibility}>
      {visible ? '👁️' : '🔒'} {/* Representação simples para o teste */}
    </div>
  ),
}));

// --- Configuração Antes de Cada Teste ---
beforeEach(() => {
  // Limpa os mocks antes de cada teste para evitar interferência entre eles
  mockNavigate.mockClear();
  mockLogin.mockClear();
});

// --- Função Auxiliar de Renderização ---
const renderComponent = () => {
  render(
    <BrowserRouter> {/* O BrowserRouter é importante para o useNavigate */}
      <Login />
    </BrowserRouter>
  );
};


describe('Login Component', () => {
  test('deve renderizar o formulário de login corretamente', () => {
    renderComponent();

    expect(screen.getByText('Fazer login')).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Senha$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/Esqueceu a senha?/i)).toBeInTheDocument();
    expect(screen.getByText(/Não tem uma conta?/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastre-se/i)).toBeInTheDocument();
  });

  test('deve exibir mensagens de erro para campos vazios ao submeter', async () => {
    renderComponent();

    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter your email.')).toBeInTheDocument();
      expect(screen.getByText('Please enter your password.')).toBeInTheDocument();
    });
    expect(mockLogin).not.toHaveBeenCalled(); // Não deve tentar logar
    expect(mockNavigate).not.toHaveBeenCalled(); // Não deve navegar
  });

//   test('deve exibir mensagem de erro para email inválido', async () => {
//     renderComponent();

//     const emailInput = screen.getByLabelText(/E-mail/i);
//     fireEvent.change(emailInput, { target: { value: 'emailinvalido' } });

//     const loginButton = screen.getByRole('button', { name: /Entrar/i });
//     fireEvent.click(loginButton);

//     screen.debug(); 

//     const emailErrorMessage = await screen.findByText('Invalid email address.', {}, { timeout: 5000 });
//     expect(emailErrorMessage).toBeInTheDocument();
    
//     expect(screen.queryByText('Please enter your password.')).not.toBeInTheDocument(); 
//     expect(mockLogin).not.toHaveBeenCalled();
//   }, 10000);


  test('deve exibir mensagem de erro para senha muito curta', async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    const passwordInput = screen.getByLabelText(/^Senha$/i);    
    fireEvent.change(passwordInput, { target: { value: '12345' } }); // Senha com 5 caracteres

    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters long.')).toBeInTheDocument();
    });
    expect(screen.queryByText('Invalid email address.')).not.toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('deve alternar a visibilidade da senha ao clicar no ícone do olho', () => {
    renderComponent();

    const passwordInput = screen.getByLabelText(/^Senha$/i) as HTMLInputElement;
    const eyeToggle = screen.getByTestId('eye-toggle');

    expect(passwordInput.type).toBe('password'); // Inicialmente é password

    fireEvent.click(eyeToggle);
    expect(passwordInput.type).toBe('text'); // Deve mudar para text

    fireEvent.click(eyeToggle);
    expect(passwordInput.type).toBe('password'); // Deve voltar para password
  });

  test('deve chamar a função de login e navegar para /home em caso de sucesso', async () => {
    renderComponent();

    mockLogin.mockResolvedValueOnce(undefined); // Simula sucesso no login

    const emailInput = screen.getByLabelText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    const passwordInput = screen.getByLabelText(/^Senha$/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.click(loginButton); 

    // Espera até que a função de login seja chamada e a navegação ocorra
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    expect(screen.queryByText(/Login failed/i)).not.toBeInTheDocument(); // Nenhuma mensagem de erro de API
  });

  test('deve exibir mensagem de erro da API em caso de falha no login', async () => {
    renderComponent();

    const errorMessage = 'Credenciais inválidas.';
    mockLogin.mockRejectedValueOnce(new Error(errorMessage)); // Simula falha no login

    const emailInput = screen.getByLabelText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    const passwordInput = screen.getByLabelText(/^Senha$/i);
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
      expect(screen.getByText(errorMessage)).toBeInTheDocument(); // Verifica a mensagem de erro
    });
    expect(mockNavigate).not.toHaveBeenCalled(); // Não deve navegar
  });

  test('deve exibir spinner de carregamento durante a submissão', async () => {
    renderComponent();

    mockLogin.mockImplementation(() => new Promise(() => {})); // Nunca resolve nem rejeita

    const emailInput = screen.getByLabelText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    const passwordInput = screen.getByLabelText(/^Senha$/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /Entrar/i })).not.toBeInTheDocument();
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  test('deve navegar para /recover-password ao clicar em "Esqueceu a senha?"', () => {
    renderComponent();

    const forgotPasswordLink = screen.getByText(/Esqueceu a senha?/i);
    fireEvent.click(forgotPasswordLink);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/recover-password');
  });

  test('deve navegar para /signup ao clicar em "Cadastre-se"', () => {
    renderComponent();

    const signupLink = screen.getByText(/Cadastre-se/i);
    fireEvent.click(signupLink);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });
});
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import imagem3 from '../assets/imagem3.png';
import Umbrella from '../assets/umbrella.svg';
import EyeToggle from '../components/ui/eye_toggle';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const validarCampos = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Preencha o e-mail.");
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Email inválido.");
        valid = false;
      }
    }

    if (!password) {
      setPasswordError("Preencha a senha.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      valid = false;
    }

    return valid;
  };

  const autenticarUsuario = async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha: password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao fazer login.");
    }

    //parte JWT q é token web JS
    const data = await response.json();
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validarCampos()) return;

    try {
      await autenticarUsuario();
    } catch (err) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError("Erro ao fazer login.");
      }
    }
  };

  return (
    <div className="h-screen w-full flex bg-white">
      <div className="h-full w-1/2 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${imagem3})` }}></div>

      <div className="h-full w-1/2 bg-white flex justify-center items-center">
        <div className="h-[70%] w-[55%] bg-white border-2 border-[#E5E5E5] rounded-[10px] shadow-md">
          <h1 className="text-3xl font-bold text-[#223A60] pt-6 px-7 pb-7">Fazer login</h1>

          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className='space-y-7'>

              {/* Campo de e-mail */}
              <div className="flex flex-col space-y-1 px-7">
                <label htmlFor="email" className="text-sm text-[#223A60] font-md">E-mail</label>
                <input
                  className="w-full border-2 border-[#E5E5E5] rounded-md text-sm pl-2 py-1.5 font-light placeholder-[#9A9A9A]"
                  id="email"
                  type="email"
                  placeholder="Digite o seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              {/* Campo de senha */}
              <div className="flex flex-col space-y-1 px-7">
                <div className="flex justify-between items-center">
                  <label htmlFor="senha" className="text-sm text-[#223A60] font-medium">Senha</label>
                  <a href="#" className="text-sm text-[#223A60] hover:underline font-sans">Esqueceu a senha?</a>
                </div>
                <div className="relative w-full">
                  <input
                    className="w-full border-2 border-[#E5E5E5] rounded-md pl-2 pr-10 py-1.5 text-sm font-light placeholder-[#9A9A9A]"
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Digite a sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute right-3 top-[50%] translate-y-[-35%] cursor-pointer">
                    <EyeToggle
                      visible={mostrarSenha}
                      toggleVisibility={() => setMostrarSenha(prev => !prev)}
                    />
                  </div>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              {/* Lembrar a senha */}
              <div className="flex items-center justify-between pl-7">
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    id="lembrar"
                    name="lembrar"
                    className="accent-[#223A60] w-3 h-3"
                  />
                  <label htmlFor="lembrar" className="text-xs text-[#223A60] pt-0.5">Lembrar a senha</label>
                </div>
              </div>

              {/* Erro de API */}
              {apiError && (
                <div className="text-red-600 text-sm font-medium px-7">{apiError}</div>
              )}
            </div>

            {/* Botões */}
            <div className="w-full flex flex-col space-y-2 px-7 pt-3">
              <button
                type="submit"
                className="py-3 bg-[#223A60] rounded-md text-white text-center font-medium hover:bg-[#2F4A80] transition"
              >
                Entrar
              </button>
            </div>

            <div className='w-full pt-4 flex justify-row gap-1 justify-center'>
              <label className='text-sm font-md text-[#283841]'>Não tem uma conta?</label>
              <a href='#' className='underline text-sm font-md text-[#223A60]'>Cadastre-se</a>
            </div>
            {/* Slogan */}
            <div className='w-full pt-3 flex flex-row items-center justify-center gap-1'>
              <label className='pt-3 text-sm font-md text-[#223A60]'>Vai Pela Sombra</label>
              <img src={Umbrella} alt="Ícone" className="w-7 h-7" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

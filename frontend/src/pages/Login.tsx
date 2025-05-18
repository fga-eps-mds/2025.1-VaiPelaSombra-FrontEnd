//mport { useState } from "react"
//import { Eye, EyeOff } from "lucide-react";
import imagem3 from '../assets/imagem3.png';
import Google_Logo from '../assets/logo_google.svg';
import Umbrella from '../assets/umbrella.svg';
function Login() {
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    //const validateEmail = () => {
        //if (!email || !password){
            //return "preencha campo de email"
        //}
        //else if(email ){

        //}
   // }
    //return (
    <div className="h-screen w-full flex bg-white ">
        
        <div className="h-full w-1/2 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${imagem3})` }}>
        </div>

        <div className="h-full w-1/2 bg-white flex justify-center items-center">
            
            <div className="h-[70%] w-[55%] bg-white border-2 border-[#E5E5E5] rounded-[10px] shadow-md">
                <h1 className="text-3xl  font-bold text-[#223A60] pt-6 px-7 pb-7">Fazer login</h1>
                    <form className="flex flex-col w-full">
                        <div className='space-y-7'>
                        <div className="flex flex-col space-y-1 px-7">
                            <label htmlFor="email" className="text-sm text-[#223A60] font-md">
                                E-mail
                            </label>
                            <input className="w-full border-2 border-[#E5E5E5] rounded-md text-sm pl-2 py-1.5 font-light placeholder-[#9A9A9A]"
                            id="email"
                            type="email"
                            placeholder="Digite o seu e-mail"
                            required
                            //value={email}
                            //onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>

                            <div className="flex flex-col space-y-1 px-7">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="senha" className="text-sm text-[#223A60] font-medium">
                                        Senha
                                    </label>
                                    <a href="#" className="text-sm text-[#223A60] hover:underline font-sans">
                                        Esqueceu a senha?
                                    </a>
                                </div>

                                <input className="w-full border-2 border-[#E5E5E5] rounded-md pl-2 py-1.5 text-sm font-light placeholder-[#9A9A9A]"
                                id="senha"
                                type="password"
                                placeholder="Digite a sua senha"
                                required
                                />
                            </div>
                                <div className="flex items-center justify-between pl-7">
                                    <div className="flex items-center gap-1.5">
                                        <input
                                        type="checkbox"
                                        id="lembrar"
                                        name="lembrar"
                                        className="accent-[#223A60] w-3 h-3"
                                        />
                                        <label htmlFor="lembrar" className="text-xs text-[#223A60] pt-0.5">
                                        Lembrar a senha
                                        </label>
                                    </div>
                                </div>

                            </div>

                            <div className="w-full flex flex-col space-y-2 px-7 pt-3">
                                <button className="py-3 bg-[#223A60] rounded-md text-white text-center font-medium hover:bg-[#2F4A80] transition">
                                    Entrar
                                </button>

                                <button className="flex items-center justify-center gap-2 py-3 border-2 border-[#E5E5E5] rounded-md bg-white text-[#767676] hover:bg-gray-100 transition">
                                    <img src={Google_Logo} alt="Ícone" className="w-6 h-6" />
                                    Entrar com o Google
                                </button>
                            </div>
                            <div className='w-full pt-4 flex justify-row gap-1 justify-center'>
                                <label className='text-sm font-md text-[#283841]'>Não tem uma conta?</label>
                                <a href='#' className='underline text-sm font-md text-[#223A60]'>Cadastre-se</a>
                            </div>
                            <div className='w-full pt-3 flex flex-row items-center justify-center gap-1'>
                                <label className='pt-3 text-sm font-md text-[#223A60]'>Vai Pela Sombra</label>
                                <img src={Umbrella} alt="Ícone" className="w-7 h-7"/>
                            </div>
                            
                        </form>
            </div>
        </div>
    </div>

    
  }
  
  export default Login
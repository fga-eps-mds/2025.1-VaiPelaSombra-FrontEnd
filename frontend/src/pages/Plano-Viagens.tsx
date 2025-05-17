import NavigateButton from "../components/NavigateButton"
import { useAppContext } from "../context/AppContext"
import Navbar from "../components/NavBar.tsx";

function Home() {
  const { theme, setTheme } = useAppContext()

  return (
    <div>
      <Navbar />
      <h1>Plano de Viagens</h1>
      <p>é aqui que se deveria ter o plano, provavelmente...</p>
      <p>Tema atual: {theme}</p>

      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Alternar tema
      </button>

      <NavigateButton to="/example-page" label="Ir para a página Example" />
      <NavigateButton to="/Home" label="Ir para Home" />
    </div>
  )
}
  export default Home
import NavigateButton from "../components/NavigateButton"
import { useAppContext } from "../context/AppContext"


function Home() {
  const { theme, setTheme } = useAppContext()

  return (
    <div>
      <h1>Home Page</h1>
      <p>Bem-vindo à página inicial!</p>
      <p>Tema atual: {theme}</p>
      <p>Se quiser alterar o tema, vá para página seguinte!</p>

      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Alternar tema
      </button>

      <NavigateButton to="/example-page" label="Ir para a página Example" />
    </div>
  )
}
  export default Home
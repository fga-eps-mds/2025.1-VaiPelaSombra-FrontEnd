import NavigateButton from "../components/NavigateButton"
import { useAppContext } from "../context/AppContext"

function ExamplePage() {

    const { theme, setTheme } = useAppContext()

    const toggleTheme = () => {
      setTheme(theme === '<<<LIGHT>>>' ? '***DARK***' : '<<<LIGHT>>>')
    }

    return (
      <div>
        <h1>Example Page</h1>
        <p>Esta é a página de exemplo.</p>
        <p>Tema atual: {theme}</p>
        <button onClick={toggleTheme}>Alternar Tema</button>
        <NavigateButton to="/home" label="Voltar para a Home" />
        <NavigateButton to="/Plano-Viagens" label="Ir para Plano de Viagens" />
      </div>
    )
  }
  
  export default ExamplePage
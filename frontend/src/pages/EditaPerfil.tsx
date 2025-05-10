import React, {useEffect, useState} from "react"
import NavigateButton from "../components/NavigateButton"
import { useAppContext } from "../context/AppContext"
import ModalProfile from "../components/Modal"

export default function EditaPerfil() {

  // const { theme, setTheme } = useAppContext()
  const [preferencias, setPreferencias] = useState<string[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    // Simulando uma chamada de API para buscar preferências
    async function fetchPreferences() {
      // Aqui você pode fazer uma chamada real para a API
      // try {
      //   const response = await fetch("http://localhost:3000/getPreferences");
      //   if (!response.ok) {
      //     throw new Error("Failed to fetch preferences");
      //   }
      //   const data = await response.json();

      //   setPreferencias(data.preferences || []);
      // } catch (error) {
      //   console.error("Error fetching preferences:", error);
      //   //throw error;
      // }
      
      const fetchedPreferences = ["ler", "viajar", "programar"]
      setPreferencias(fetchedPreferences)
      console.log("Preferências:", fetchedPreferences)
      console.log("OpenModal:" + openModal)
    }

    fetchPreferences()
  }, [openModal])
  //console.log("Preferencias:", preferencias)

  // const handleButtonClick = () => {
  //   // shalow copy e deep copy
  //   const preference = "viajar"
  //   const newPreferences = [...preferencias, preference]
  //   setPreferencias(newPreferences)
  //   console.log("Preferencias:", preferencias)
  // }
  //setPreferencias(["asdada","asafaac"])

  function handleChangeModal() {
    setOpenModal(!openModal) 
  }

  return (
    <div>
      <h1>Edite Perfil</h1>
      {/* //Img de perfil */}
      <img src="https://via.placeholder.com/150" alt="Perfil" />
      <div>
        
        <div>
          Dados do Usuário
        </div>
        <div>
          Privacidade
        </div>
        <div>
          Preferencias  
          <ModalProfile
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onSave={(data) => {
              console.log("Preferências salvas:", data);
              setOpenModal(false);
            }}
          />
          <button onClick={handleChangeModal}>Abrir Modal</button>            
        </div>
      </div>
    </div>
  )
}
  

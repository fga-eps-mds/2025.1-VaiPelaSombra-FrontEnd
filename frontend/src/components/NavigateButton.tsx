import { useNavigate } from 'react-router-dom'

interface NavigateButtonProps {
  to: string
  label: string
}

function NavigateButton({ to, label }: NavigateButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
  }

  return <button onClick={handleClick}>{label}</button>
}

export default NavigateButton
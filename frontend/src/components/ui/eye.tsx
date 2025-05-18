import { useState } from "react"
import { Eye, EyeOff } from "lucide-react";

function EyeToggle(){
const [confirmarverSenha, setConfirmarVerSenha] = useState(false);
<button
    type="button"
    onClick={() => setConfirmarVerSenha((prev) => !prev)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
    {confirmarverSenha ? <EyeOff size={20} /> : <Eye size={20} />}
</button>
}
export default EyeToggle;
import { Eye, EyeOff } from "lucide-react";

interface EyeToggleProps {
  visible: boolean;
  toggleVisibility: () => void;
  className?: string;
}

function EyeToggle({ visible, toggleVisibility, className = "" }: EyeToggleProps) {
  return (
    <button
      type="button"
      onClick={toggleVisibility}
      className={`text-[#223A60] hover:text-[#223A60] ${className}`}
    >
      {visible ? <Eye size={20} /> : <EyeOff size={20} />}
    </button>
  );
}

export default EyeToggle;
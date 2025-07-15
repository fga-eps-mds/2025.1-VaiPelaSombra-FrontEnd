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
      className={`cursor-pointer text-[#223A60] hover:text-[#223A60] ${className}`}
    >
      {visible ? <Eye size={19} /> : <EyeOff size={19} />}
    </button>
  );
}

export default EyeToggle;

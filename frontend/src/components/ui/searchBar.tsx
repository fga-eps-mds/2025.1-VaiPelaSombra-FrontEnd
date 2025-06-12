import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#223A60]" />
        <Input
          type="text"
          placeholder="Buscar destino..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10 py-5 rounded-xl shadow-md bg-white text-lg focus:outline-none focus:ring-2 transition-all duration-200 hover:shadow-lg"
/>

        {value.trim() !== "" && (
         <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center"
            aria-label="Limpar busca">
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

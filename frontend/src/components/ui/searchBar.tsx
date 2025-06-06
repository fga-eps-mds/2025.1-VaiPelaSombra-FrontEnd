import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#223A60]" />
        <Input
          type="search"
          placeholder="Buscar destino..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 py-5 rounded-xl shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />
      </div>
    </div>
  );
}

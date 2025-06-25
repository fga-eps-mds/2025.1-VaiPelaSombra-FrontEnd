import React, { useState } from "react";
import defaultavatar from '../../assets/images/defaultavatar.png';
 
type Profile = {
  name: string;
  email: string;
  avatar?: string; 
  travelerType: string;
  travelFrequency: string;
  averageBudget: string;
};

type ProfileFormProps = {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Profile>({
    ...profile,
    avatar: profile.avatar || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
 };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 px-7 py-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-2">
       <img
           src={formData.avatar && formData.avatar.trim() !== "" ? formData.avatar : defaultavatar}
           alt="Avatar Preview"
          className="w-24 h-24 rounded-full object-cover border-2 border-black"
            />
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border-2 border-black rounded-md p-2"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">Nome</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="travelerType" className="block text-sm font-medium">Estilo do Viajante:</label>
        <input
          id="travelerType"
          name="travelerType"
          value={formData.travelerType}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="travelFrequency" className="block text-sm font-medium">Frequência de Viagem:</label>
        <input
          id="travelFrequency"
          name="travelFrequency"
          value={formData.travelFrequency}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="averageBudget" className="block text-sm font-medium">Renda:</label>
        <input
          id="averageBudget"
          name="averageBudget"
          value={formData.averageBudget}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#223A60] text-white rounded-md"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;

import { useState } from "react";  
import ProfileCard from "../components/ui/profilecard";
import ProfileForm  from "../components/ui/profileform";
import userAvatar from "../assets/images/Paco-PatoAventuras2017.webp"; 
import backgroundImage from "../assets/estilo.png";

type Profile = {
  name: string;
  email: string;
  preferencias: string[];
  avatar?: string;
};

const Profile = () => {
  const [profile, setProfile] = useState<Profile>({
    name: "Maria Silva",
    email: "maria@exemplo.com",
    preferencias: ["Praia", "Clima quente", "Viagens rápidas"],
    avatar: userAvatar,  // <-- sem aspas, usa a variável
  });

  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = () => setEditMode(true);

  const handleSave = (updatedProfile: Profile) => {
    const cleanedPreferences = updatedProfile.preferencias
      .map(p => p.trim())
      .filter(p => p.length > 0);

    setProfile({
      ...updatedProfile,
      preferencias: cleanedPreferences,
      avatar: updatedProfile.avatar, 
    });

    setEditMode(false);
    setSuccessMessage("Perfil atualizado com sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-4xl font-semibold mb-4 text-center text-[#223A60]">Perfil</h1>

        {editMode ? (
          <ProfileForm
            profile={profile}
            onSave={handleSave}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <ProfileCard
            name={profile.name}
            email={profile.email}
            preferencias={profile.preferencias}
            avatar={profile.avatar!}  
            onEdit={handleEdit}
          />
        )}

        {successMessage && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

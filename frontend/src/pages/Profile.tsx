import { useState, useEffect } from "react";
import ProfileCard from "../components/ui/profilecard";
import ProfileForm from "../components/ui/profileform";
import defaultavatar from '../assets/images/defaultavatar.png';
import Navbar from "../components/NavBar.tsx";
import config from "../config";

type ProfileType = {
  name: string;
  email: string;
  avatar?: string;
  travelerType: string;
  travelFrequency: string;
  averageBudget: string;
  id?: number; 
};

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType>({
    name: "",
    email: "",
    travelerType: "",
    travelFrequency: "", 
    averageBudget: "", 
    avatar: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = 1; 
        const response = await fetch(`${config.apiBaseUrl}/user/${userId}`);

        if (!response.ok) {
          throw new Error("Erro ao carregar o perfil.");
        }

        const data = await response.json();
        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          travelerType: data.travelPreferences?.travelerType || "",
          travelFrequency: data.travelPreferences?.travelFrequency || "",
          averageBudget: data.travelPreferences?.averageBudget || "",
          avatar: data.profileImage || defaultavatar,
        });
        setErrorMessage("");
      } catch (err: unknown) {
      const error = err as Error;
      console.error("Erro ao carregar dados do usuário:", error);
      setErrorMessage("Não foi possível carregar o perfil.");
      }

    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => setEditMode(true);

  const handleSave = async (updatedProfile: ProfileType) => {
    try {
      const userId = profile.id;

      if (!userId) {
        setErrorMessage("Usuario não encontrado");
        return;
      }

      const response = await fetch(`${config.apiBaseUrl}/users/${userId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({
          name: updatedProfile.name,
          email: updatedProfile.email,
          profileImage: updatedProfile.avatar,
          travelPreferencesData: {
            travelerType: updatedProfile.travelerType,
            travelFrequency: updatedProfile.travelFrequency,
            averageBudget: updatedProfile.averageBudget,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil");
      }

      const data = await response.json();
      setProfile({
        id: data.id,
        name: data.name,
        email: data.email,
        travelerType: data.travelPreferences?.travelerType || "",
        travelFrequency: data.travelPreferences?.travelFrequency || "",
        averageBudget: data.travelPreferences?.averageBudget || "",
        avatar: data.avatar || defaultavatar,
      });

      if (updatedProfile.avatar) {
        localStorage.setItem("userAvatar", updatedProfile.avatar);
        const event = new Event("avatarUpdated");
        window.dispatchEvent(event);
      }

      setEditMode(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
      setErrorMessage(""); 
      setTimeout(() => setSuccessMessage(""), 3000);
    }catch (err: unknown) {
       const error = err as Error;
       console.error("Erro ao salvar perfil:", error);
      setErrorMessage("Erro ao atualizar perfil. " + (error.message || "Tente novamente."));
      setSuccessMessage("");
      }

  };


  return (
    <div className="min-h-screen bg-[#223A60] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <h1 className="text-4xl font-semibold mb-1 text-center text-[#223A60]">Perfil</h1>

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
              avatar={profile.avatar!}
              travelerType={profile.travelerType}
              travelFrequency={profile.travelFrequency}
              averageBudget={profile.averageBudget}
              onEdit={handleEdit}
            />
          )}

          {successMessage && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center">
              {successMessage}
            </div>
            
          )}
          {errorMessage && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
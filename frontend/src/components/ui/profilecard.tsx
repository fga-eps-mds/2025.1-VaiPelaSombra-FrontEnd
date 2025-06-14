import React from "react";
type ProfileCardProps = {
  name: string;
  email: string;
  preferencias: string[];
  avatar?: string;
  onEdit: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, preferencias, avatar, onEdit }) => {
 return (
    <div>
      <div className="flex flex-col space-y-6 px-7 py-6 bg-white rounded-lg shadow-md mt-5" >
        <div className="flex justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar do Usuário"
              className="w-32 h-32 rounded-full object-cover border-3 border-black mt-5"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 border-2 border-black" />
          )}
        </div>
        <div className="space-y-4 text-m mt-7">
          <p><strong>Nome:</strong> {name}</p>
          <p><strong>E-mail:</strong> {email}</p>
          <p><strong>Preferências:</strong> {preferencias.join(", ")}</p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="py-2 px-4 bg-[#223A60] text-white rounded-md hover:bg-[#2F4A80] transition self-center"
        >
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
type ProfileCardProps = {
  name: string;
  email: string;
  preferencias: string[];
  avatar: string;
  onEdit: () => void;
};

const ProfileCard = ({ name, email, preferencias, avatar, onEdit }: ProfileCardProps) => {
  return (
    <div className="flex flex-col items-center space-y-6 px-7 py-8 bg-white rounded-lg shadow-md">
      <div>
        <img
          src={avatar}
          alt="Avatar do Usuário"
          className="w-24 h-24 rounded-full object-cover border-2 border-[#223A60]"
        />
      </div>

      <div className=" text-center space-y-2">
        <p className="mt-3"><strong>Nome:</strong> {name}</p>
        <p className="mt-3"><strong>E-mail:</strong> {email}</p>
        <p className="mt-3"><strong>Preferências:</strong> {preferencias.join(", ")}</p>
      </div>
      <button
        type="button"
        className="py-2 px-4 bg-[#223A60] rounded-md text-white font-medium hover:bg-[#2F4A80] transition"
        onClick={onEdit}
      >
        Editar Perfil
      </button>
    </div>
  );
};

export default ProfileCard;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logoIcon from '../assets/images/logoIcon.png';
import userAvatar from '../assets/images/GoombaExample.jpeg';

const NavItemSeparator: React.FC = () => <span className="nav-item-separator">|</span>;

const Navbar: React.FC = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? "nav-item active" : "nav-item";
  };

  const notificationCount = 12; // se for 1, mostra notificação, se for 0, não mostra

  return (
    <header className="navbar">
      {/* Seção Esquerda: Logo e Pesquisa*/}
      <div className="navbar-left">
        <div className="logo-group">
          {/* LOGO-ICON AGORA USA UM ASSET IMPORTADO */}
          <img src={logoIcon} alt="Ícone da Logo" className="logo-icon-actual" />
          <span className="logo-text-beside">VAI PELA SOMBRA</span>
        </div>
        <input type="text" placeholder="Pesquisar um lugar" className="search" />
      </div>

      {/* Seção Central: Links de Navegação */}
      <nav className="navbar-center">
        <NavLink to="/" className={getNavLinkClass}>Página Principal</NavLink>
        <NavItemSeparator />
        <NavLink to="/planoViagem" className={getNavLinkClass}>Planos de Viagens</NavLink>
        <NavItemSeparator />
        <NavLink to="/guias-viagem" className={getNavLinkClass}>Guias de Viagem</NavLink>
        <NavItemSeparator />
        <NavLink to="/hoteis" className={getNavLinkClass}>Hotéis</NavLink>
        <NavItemSeparator />
        <NavLink to="/promocoes" className={getNavLinkClass}>Promoções</NavLink>
        <NavItemSeparator />
        <NavLink to="/perfil" className={getNavLinkClass}>Perfil</NavLink>
        <NavItemSeparator />
        <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
      </nav>

      {/* Seção Direita */}
      <div className="navbar-right">
        <div className="location">
          <span className="icon-placeholder" style={{ marginRight: '4px' }}>📍</span>
          <span>Brasília, Brasil</span>
          <span className="icon-placeholder" style={{ marginLeft: '4px' }}>▼</span>
        </div>

        <NavLink to="/notificacoes" className="notification-button">
          <div className="notification-wrapper">
            <span className="icon-placeholder notification-bell-placeholder" style={{ fontSize: '22px' }}>🔔</span>
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </div>
        </NavLink>

        {/* AVATAR AGORA USA UM ASSET IMPORTADO */}
        <img src={userAvatar} alt="Avatar do Usuário" className="avatar-actual" />
      </div>
    </header>
  );
};

export default Navbar;
import { NavLink, Link, useMatch, useResolvedPath, useLocation } from 'react-router-dom'

import { getActiveNavLinkStyles } from '../utils/utils'

export default function Header() {
  const {pathname} = useLocation();
  const isAboutPage = pathname === "/about";

  return (
    <header>
      <div className='logo-container'>
        <Link to="/" className='logo-link'>
          <span>Echoes of Wisdom UI Exploration</span>
        </Link>
      </div>
      <div className='nav-container'>
        <NavLink to="/" style={() => getActiveNavLinkStyles({ isActive: !isAboutPage })} end>Prototypes</NavLink>
        <NavLink to="/about" style={() => getActiveNavLinkStyles({ isActive: isAboutPage })}>About</NavLink>
      </div>
    </header>
  );
}
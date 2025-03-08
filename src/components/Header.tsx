import { NavLink, Link, useLocation } from 'react-router-dom'

import { getActiveNavLinkStyles } from '../utils/utils'

export default function Header() {
  const {pathname} = useLocation();
  const isInPrototype = pathname !== "/about"
    && pathname !== "/references"
    && pathname !== "/analysis";

  return (
    <header>
      <div className='logo-container'>
        <Link to="/" className='logo-link'>
          <span>Echoes of Wisdom UI Exploration</span>
        </Link>
      </div>
      <div className='nav-container'>
        <NavLink to="/" style={() => getActiveNavLinkStyles({ isActive: isInPrototype })} end>Prototypes</NavLink>
        <NavLink to="/references" style={getActiveNavLinkStyles}>References</NavLink>
        <NavLink to="/analysis" style={getActiveNavLinkStyles}>Analysis</NavLink>
        <NavLink to="/about" style={getActiveNavLinkStyles}>About</NavLink>
      </div>
    </header>
  );
}
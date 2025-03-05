import { NavLink, Link } from 'react-router-dom'

export default function Header() {

  const activeStyles = {
    color: 'var(--color-accent)',
    backgroundColor: 'transparent',
    outline: '0'
  }

  function getActiveStyles({ isActive }: { isActive: boolean }) {
    return isActive ? activeStyles : {}
  }

  return (
    <header>
      <div className='logo-container'>
        <Link to="/" className='logo-link'>
          <span>Echoes of Wisdom Menu Alternatives</span>
        </Link>
      </div>
      <div className='nav-container'>
        <NavLink to="/" style={getActiveStyles}>Explore</NavLink>
        <NavLink to="/about" style={getActiveStyles}>About</NavLink>
      </div>
    </header>
  );
}
import { NavLink, Outlet } from 'react-router-dom'

import { getActiveNavLinkStyles } from '../utils/utils'

export default function SelectorChoice() {
  return (
    <>
      <div className="selector-choice">
        <NavLink to="/" style={getActiveNavLinkStyles}>Original</NavLink>
        <NavLink to="/acceleration" style={getActiveNavLinkStyles}>Original+Acceleration</NavLink>
        <NavLink to="/scrolling-grid" style={getActiveNavLinkStyles}>Scrolling Grid</NavLink>
        <NavLink to="/tabbed-grid" style={getActiveNavLinkStyles}>Tabbed Grid</NavLink>
        <NavLink to="/bar" style={getActiveNavLinkStyles}>Cross Media Bar</NavLink>
        <NavLink to="/spiral" style={getActiveNavLinkStyles}>Spiral</NavLink>
      </div>
      <Outlet />
    </>
  )
}
import { NavLink, Outlet } from 'react-router-dom'

export default function SelectorChoice() {
  return (
    <>
      <div className="selector-choice">
        <NavLink to="/">Original</NavLink>
        <NavLink to="/acceleration">Original+Acceleration</NavLink>
        <NavLink to="/grid">TabbedGrid</NavLink>
        <NavLink to="/bar">Cross Media Bar</NavLink>
        <NavLink to="/spiral">Spiral</NavLink>
      </div>
      <Outlet />
    </>
  )
}
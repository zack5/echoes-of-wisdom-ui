import { NavLink, Outlet } from 'react-router-dom'

export default function SelectorChoice() {
  return (
    <>
      <div className="selector-choice">
        <NavLink to="/">Original</NavLink>
        <NavLink to="/spiral">Spiral</NavLink>
      </div>
      <Outlet />
    </>
  )
}
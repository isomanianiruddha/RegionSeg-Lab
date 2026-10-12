import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <div className="logo-mark">R</div>

        <div>
          <h2>RegionSeg</h2>
          <span>LAB</span>
        </div>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/learn">Learn</NavLink>
        <NavLink to="/example">Example</NavLink>
        <NavLink to="/custom-lab">Custom Lab</NavLink>
        <NavLink to="/operations">DIP Operations</NavLink>
        <NavLink to="/real-world">Real World</NavLink>
      </div>

      <NavLink to="/custom-lab" className="nav-button">
        Launch Lab →
      </NavLink>
    </nav>
  );
}

export default Navbar;
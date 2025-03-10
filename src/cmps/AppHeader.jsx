import { UserMsg } from "./UserMsg.jsx";

import { NavLink } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Car App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  );
}

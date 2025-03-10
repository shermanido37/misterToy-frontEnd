import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { UserLogin } from "./UserLogin.jsx";
import { UserMsg } from "./UserMsg.jsx";
import { login, logout } from "../store/actions/user.actions.js";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);

  async function onSetUser(credentials) {
    try {
      await login(credentials);
      showSuccessMsg("Your login was successful.");
    } catch (err) {
      showErrorMsg("There was an error handling your request.");
      console.log(err);
    }
  }

  function onLogout() {
    try {
      logout();
      showSuccessMsg("You have successfully logged out.");
    } catch (err) {
      showErrorMsg("There was an error handling your request.");
      console.log(err);
    }
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Car App</h1>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <UserLogin onSetUser={onSetUser} />
        )}
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/toys">Our Toys</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  );
}

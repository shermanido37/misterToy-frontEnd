import { useState } from "react";
import { NavLink } from "react-router-dom";
import { userService } from "../services/user.service";

export function UserLogin({ onSetUser }) {
  const [credentials, setCredentials] = useState(
    userService.getEmptyCredentials()
  );

  function handleChange({ target }) {
    const { name: field, value } = target;
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log("submitted");
    onSetUser(credentials);
  }

  return (
    <section className="user-login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
          autoFocus
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input type="submit" value="Login" />
        <br />
        <span>
          Don't have a user? Sign up <NavLink to="">here</NavLink>
        </span>
      </form>
    </section>
  );
}

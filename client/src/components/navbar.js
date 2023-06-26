import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/saved-recipes" className="navlink">My Recipes</Link>
      <Link to="/create-recipe" className="navlink">Choose Recipe</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout} className="navbtn"> Logout </button>
      )}
    </div>
  );
};

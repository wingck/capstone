import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3001/auth/register", {
          username,
          password,
        });
        alert("Registration Completed! Now login.");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="auth-container">
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <a href="/" className="btn2">Back</a>
            <button type="submit" className="btn1">Register</button>
            </form>
        </div>
      </div>
    );
  };
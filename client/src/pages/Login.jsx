import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../helpers/api/lingapp/authentication";
import logo from "../images/lingapp-logo-reverse.png";
import { setItem } from "../helpers/localStorage";
import { toast } from "react-toastify";

const DIMENSIONS_CLASS = "py-2 px-4 h-14 w-4/5 text-xl rounded-md max-w-lg";

const initLoginForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginForm, setLoginForm] = useState(initLoginForm);

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = async () => {
    const loginAction = await login(loginForm);

    if (loginAction.status === 200) {
      toast.success("Welcome back!");
      setItem("Authorization", "");
      setItem("Authorization", loginAction.data.token);
      navigate("/");
    } else {
      console.log(loginAction);
      toast.error(loginAction.errors);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="bg-red-400 h-screen min-w-full flex flex-col place-items-center pt-12 gap-4">
      <div className="py-4 flex flex-col place-items-center">
        <img src={logo} alt="lingapp-logo" className="h-36 w-36" />
        <h1 className="text-5xl text-white">Lingapp</h1>
      </div>

      <input
        type="text"
        className={DIMENSIONS_CLASS}
        placeholder="Email"
        name="email"
        onChange={handleFormChange}
        onKeyPress={handleKeyPress}
      />
      <input
        type="password"
        className={DIMENSIONS_CLASS}
        placeholder="Password"
        name="password"
        onChange={handleFormChange}
        onKeyPress={handleKeyPress}
      />

      <button
        name="login"
        className={`${DIMENSIONS_CLASS} bg-red-300 text-white`}
        onClick={handleLogin}
      >
        Log In
      </button>

      <div className="fixed bottom-10">
        <span className="text-white text-lg">Sign Up for Lingapp</span>
      </div>
    </div>
  );
};

export default Login;

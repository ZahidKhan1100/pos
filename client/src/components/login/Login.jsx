import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.jpeg";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/sales");
    }
  });

  const handleValidation = () => {
    if (email === "") {
      toast.error("email is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (handleValidation) {
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });

      if (data.status === false) {
        return toast.error(data.message, toastOptions);
      }

      const user = data.user;
      localStorage.setItem(
        "user",
        JSON.stringify({ name: user.name, email: user.email })
      );
      navigate("/sales");
    }
  };

  return (
    <Container>
      <div className="section">
        <img className="logo" src={logo} alt="" srcset="" />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleSubmit()}>Login</button>
      </div>
      <ToastContainer></ToastContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .section {
    background-color: white;
    width: 35%;
    height: 70vh;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    justify-content: center;
    align-items: center;

    @media (max-width: 760px) {
      width: 100%;
      height: 100vh;
    }

    .logo {
      width: 40%;
      height: 40%;

      @media (max-width: 760px) {
        width: 50%;
        height: 30%;
      }
    }

    input {
      width: 100%;
      height: 2.5rem;
      border-radius: 0.6rem;
      border: solid 0.1 black;
      padding: 10px;
    }
    button {
      width: 50%;
      height: 2.5rem;
      border-radius: 0.6rem;
      background-color: purple;
      color: white;
      border: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default Login;

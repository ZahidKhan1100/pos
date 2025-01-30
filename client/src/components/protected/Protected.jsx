import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Protected = (props) => {
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    let token = localStorage.getItem("user");
    if (!token) {
      navigate("/login");
    }
  });
  return <Component />;
};

export default Protected;

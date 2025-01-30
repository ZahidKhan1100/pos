import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  color: #000000;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: #272732;
    transition: 5ms;
  }
  &.active {
    font-weight: bold;
    color: green;
  }
`;

const HeaderNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Navbar
      bg="light"
      data-bs-theme="light"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand href="#">POS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <StyledNavLink to="/sales">Sales</StyledNavLink>
            </Nav.Link>
            <Nav.Link>
              <StyledNavLink to="/category">Category</StyledNavLink>
            </Nav.Link>
            <Nav.Link>
              <StyledNavLink to="/product">Product</StyledNavLink>
            </Nav.Link>
            <Nav.Link>
              <StyledNavLink to="/employee">Employee</StyledNavLink>
            </Nav.Link>
            <Nav.Link>
              <StyledNavLink to="/role">Role</StyledNavLink>
            </Nav.Link>
            <Nav.Link>
              <StyledNavLink to="/bill">Bill</StyledNavLink>
            </Nav.Link>
            <Nav.Link>
              <StyledNavLink to="/report">Report</StyledNavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button className="logout">
          <button onClick={() => handleLogout()}>logout</button>
        </Button>
      </Container>
    </Navbar>
  );
};

const Button = styled.div`
  button {
    width: 5rem;
    padding: 0.2rem;
    border: none;
    background-color: red;
    color: white;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export default HeaderNavbar;

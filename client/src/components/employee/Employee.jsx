import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addEmployeeRoute, deleteEmployeeRoute } from "../../utils/APIRoutes";
import EmployeeTable from "./EmployeeTable";
import { fetchRoles } from "../../features/role/roleSlice";
import {
  addEmployee,
  removeEmployee,
  updateEmployee,
} from "../../features/employee/employeeSlice";

const Employee = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [role_id, setRoleId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [modalTitle, setModalTitle] = useState("Add Employee");
  const [hidePassword, setHidePassword] = useState(false);

  const employees = useSelector((state) => state.employee.employees);
  const roles = useSelector((state) => state.role.roles);
  console.log("roles", roles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    setName("");
    setPassword("");
    setEmail("");
    setContact("");
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleEdit = (id) => {
    const employee = employees.find((employee) => employee._id === id);
    setId(employee._id);
    setName(employee.name);
    setEmail(employee.email);
    setContact(employee.contact);
    setRoleId(employee.role_id);
    setModalTitle("Update Employee");
    setShow(true);
    setHidePassword(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(`${deleteEmployeeRoute}/${id}`);
          if (data.status === true) {
            dispatch(removeEmployee(id));
            Swal.fire({
              title: "Deleted!",
              text: "Your employee has been deleted.",
              icon: "success",
            });
          } else {
            // Handle error message from API
            Swal.fire({
              title: "Error!",
              text: data.message, // Assuming the API returns an error message
              icon: "error",
            });
          }
        } catch (error) {
          // Handle Axios error
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the employee.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleValidation = () => {
    if (name === "") {
      toast.error("Name is required", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (password === "") {
      if (hidePassword) {
        return true;
      } else {
        toast.error("Password is required", toastOptions);
        return false;
      }
    } else if (contact === "") {
      toast.error("Contact is required", toastOptions);
      return false;
    } else if (role_id === "") {
      toast.error("Contact is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(addEmployeeRoute, {
        id,
        name,
        email,
        password,
        role_id,
        contact,
      });

      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }

      if (data.status === true) {
        setShow(false);
        dispatch(addEmployee(data));
      }
      if (data.status === "updated") {
        setShow(false);
        dispatch(updateEmployee(data));
      }
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="employeeForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeForm.ControlInput2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter Employee Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeForm.ControlInput3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={contact}
                placeholder="Enter Employee Contact"
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>
            {!hidePassword && (
              <Form.Group
                className="mb-3"
                controlId="employeeForm.ControlInput4"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter Employee Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="employeeForm.ControlInput4">
              <Form.Label>Select Role</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={role_id}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option>Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <StyledContainer fluid>
        <Row className="justify-content-end">
          <Col xs="auto">
            <Button className="mb-2" onClick={handleShow}>
              Add Employee
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <EmployeeTable
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            ></EmployeeTable>
          </Col>
        </Row>
      </StyledContainer>
      <ToastContainer></ToastContainer>
    </>
  );
};

const StyledContainer = styled(Container)`
  padding: 2rem;
  background-color: transparent;
  margin-top: 1rem;
  svg {
    font-size: 1rem;
  }
  .action {
    display: flex;
    gap: 1rem;
  }
  .text-end {
    padding: 2px;
  }
`;
export default Employee;

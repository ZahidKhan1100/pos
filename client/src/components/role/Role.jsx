import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { addRoleRoute, deleteRoleRoute } from "../../utils/APIRoutes";
import { addRole, removeRole, updateRole } from "../../features/role/roleSlice";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import RoleTable from "./RoleTable";
import { fetchPermissions } from "../../features/permissions/permissionSlice";

const Role = () => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("");
  const [selectPermission, setSelectPermission] = useState([]);
  const [id, setId] = useState("");
  const [modalTitle, setModalTitle] = useState("Add Category");
  const permissions = useSelector((state) => state.permission.permissions);

  const roles = useSelector((state) => state.role.roles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setRole("");
    setId("");
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectPermission((prevPermissions) => [...prevPermissions, value]);
    } else {
      setSelectPermission((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== value)
      );
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleEdit = (id) => {
    const role = roles.find((role) => role._id === id);
    setRole(role.role);
    setId(role._id);
    setModalTitle("Update Category");
    setShow(true);
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
          const { data } = await axios.delete(`${deleteRoleRoute}/${id}`);
          if (data.status === true) {
            dispatch(removeRole(id));
            Swal.fire({
              title: "Deleted!",
              text: "Your Category has been deleted.",
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
            text: "An error occurred while deleting the category.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleValidation = () => {
    if (role === "") {
      toast.error("Name is required", toastOptions);
      return false;
    } else if (role === "") {
      toast.error("Description is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(addRoleRoute, {
        id,
        role,
      });

      console.log("updated", data);

      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }

      if (data.status === true) {
        setShow(false);
        dispatch(addRole(data));
      }

      if (data.status === "updated") {
        setShow(false);
        dispatch(updateRole(data));
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
            <Form.Group className="mb-3" controlId="roleForm.ControlInput1">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="roleForm.checkbox1">
              <Form.Label>Permissions</Form.Label>
              {selectPermission &&
                selectPermission.map((sp) => <span>{sp}</span>)}
              <br />
              {permissions &&
                permissions.map((permission) => (
                  <Form.Check
                    key={permission.id} // Add a unique key prop
                    inline
                    label={permission.name}
                    name="permissions"
                    type="checkbox"
                    value={permission.name} // Set value to permission name or unique identifier
                    onChange={handleCheckboxChange} // Handle checkbox change
                  />
                ))}
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
              Add Role
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <RoleTable
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            ></RoleTable>
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
export default Role;

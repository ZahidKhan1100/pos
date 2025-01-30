import React, { useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { addCategoryRoute, deleteCategoryRoute } from "../../utils/APIRoutes";
import {
  addCategory,
  removeCategory,
  updateCategory,
} from "../../features/category/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import CategoryTable from "./CategoryTable";
import Swal from "sweetalert2";

const Category = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [modalTitle, setModalTitle] = useState("Add Category");

  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setName("");
    setDescription("");
    setId("");
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleEdit = (id) => {
    const category = categories.find((category) => category._id === id);
    setName(category.name);
    setDescription(category.description);
    setId(category._id);
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
          const { data } = await axios.delete(`${deleteCategoryRoute}/${id}`);
          if (data.status === true) {
            dispatch(removeCategory(id));
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
    if (name === "") {
      toast.error("Name is required", toastOptions);
      return false;
    } else if (description === "") {
      toast.error("Description is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(addCategoryRoute, {
        id,
        name,
        description,
      });

      console.log("updated", data);

      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }

      if (data.status === true) {
        setShow(false);
        dispatch(addCategory(data));
      }

      if (data.status === "updated") {
        setShow(false);
        dispatch(updateCategory(data));
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
            <Form.Group className="mb-3" controlId="categoryForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="categoryForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
              Add Category
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <CategoryTable
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            ></CategoryTable>
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
export default Category;

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addProductRoute, deleteProductRoute } from "../../utils/APIRoutes";
import {
  addProduct,
  fetchProducts,
  removeProduct,
  updateProduct,
} from "../../features/products/productSlice";
import { fetchCategories } from "../../features/category/categorySlice";
import ProductsTable from "./ProductsTable";

const Product = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity_in_stock, setQuantityInStock] = useState("");
  const [modalTitle, setModalTitle] = useState("Add Product");
  const [hidePassword, setHidePassword] = useState(false);

  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    setName("");
    setCategoryId("");
    setPrice("");
    setDescription("");
    setQuantityInStock("");
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleEdit = (id) => {
    const product = products.find((product) => product._id === id);
    setId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategoryId(product.category_id);
    setQuantityInStock(product.quantity_in_stock);
    setModalTitle("Update Product");
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
          const { data } = await axios.delete(`${deleteProductRoute}/${id}`);
          if (data.status === true) {
            dispatch(removeProduct(id));
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
    } else if (description === "") {
      toast.error("Description is required", toastOptions);
      return false;
    } else if (category_id === "") {
      if (hidePassword) {
        return true;
      } else {
        toast.error("Category is required", toastOptions);
        return false;
      }
    } else if (price === "") {
      toast.error("Price is required", toastOptions);
      return false;
    } else if (quantity_in_stock === "") {
      toast.error("Quantity is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      const { data } = await axios.post(addProductRoute, {
        id,
        name,
        description,
        category_id,
        price,
        quantity_in_stock,
      });

      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }

      if (data.status === true) {
        setShow(false);
        dispatch(addProduct(data));
        dispatch(fetchProducts());
      }
      if (data.status === "updated") {
        setShow(false);
        dispatch(updateProduct(data));
        dispatch(fetchProducts());
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
            <Form.Group className="mb-3" controlId="productForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productForm.ControlInput2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="email"
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productForm.ControlInput3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                placeholder="Enter Product Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productForm.ControlInput3">
              <Form.Label>Quantity in stock</Form.Label>
              <Form.Control
                type="text"
                value={quantity_in_stock}
                placeholder="Enter Product Price"
                onChange={(e) => setQuantityInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productForm.ControlInput4">
              <Form.Label>Select Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option>Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
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
              Add Product
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ProductsTable
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            ></ProductsTable>
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
export default Product;

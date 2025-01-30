import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import { FaCartPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { addSaleRoute } from "../../utils/APIRoutes";
import axios from "axios";
import { clearCart } from "../../features/cart/cartSlice";
import { CiSquareRemove } from "react-icons/ci";
import Table from "react-bootstrap/Table";
import logo from "../../assets/logo.jpeg";

import {
  addItem,
  incrementQuantity,
  removeItem,
  updateQuantity,
} from "../../features/cart/cartSlice";

const Sales = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [records, setRecords] = useState(products);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bill, setBill] = useState({});
  const [show, setShow] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    let amount = 0;
    for (let index = 0; index < cartItems.length; index++) {
      amount += cartItems[index].total;
    }
    setTotalAmount(amount);
  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setRecords(products);
  }, [products]);

  const handleCategory = (id) => {
    const newData = products.filter((product) => {
      return product.category_id === id;
    });
    console.log(newData);
    setRecords(newData);
  };

  const handleQuantityChange = (value, index) => {
    const Item = cartItems.find((item, ind) => ind === index);
    if (value > Item.quantity_in_stock) {
      return toast.error(
        `Quantity exceeds. Available stock ${Item.quantity_in_stock}`,
        toastOptions
      );
    } else {
      dispatch(updateQuantity({ value, index }));
    }
  };

  const handleAddToCart = (id) => {
    const product = products.find((product) => {
      return product._id === id;
    });

    if (product) {
      const Item = cartItems.find((item) => item._id === id);
      if (Item) {
        if (Item.quantity >= Item.quantity_in_stock) {
          return toast.error(
            `Quantity exceeds. Available stock ${Item.quantity_in_stock}`,
            toastOptions
          );
        } else {
          dispatch(incrementQuantity(id));
        }
      } else {
        const item = { ...product, quantity: 1, total: product.price * 1 };
        dispatch(addItem(item));
      }
    }
  };

  const handleRemoveFromCart = (index) => {
    dispatch(removeItem(index));
  };

  const handleSale = async () => {
    const { data } = await axios.post(addSaleRoute, {
      items: cartItems,
      totalAmount,
    });

    if (data.status === true) {
      setBill(data.sale);
      dispatch(clearCart());
      dispatch(fetchProducts());
      setShow(true);
    }
  };

  const handleSearch = (value) => {
    const searchText = value.toLowerCase();

    if (searchText === " ") {
      setRecords(products);
    } else {
      const newData = products.filter((product) => {
        return product.name.toLowerCase().includes(searchText);
      });
      setRecords(newData);
    }
  };

  return (
    <>
      {show && (
        <Bill>
          <div className="icon" style={{ cursor: "pointer" }}>
            <CiSquareRemove onClick={() => setShow(!show)} />
          </div>
          <div className="logo">
            <img src={logo} alt="Logo" srcset="" />
          </div>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items &&
                bill.items.map((item, key) => (
                  <tr className="product" key={key}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="footer">
            <div className="section">
              <span>Name:</span>
              <span>{bill.name}</span>
            </div>
            <div className="section">
              <span>Total Amount:</span>
              <span>{bill.total_amount}</span>
            </div>
          </div>
          <div className="message">
            <p>
              "Thank you for choosing us for your shopping needs! Your receipt
              is a token of our gratitude. Should you require any assistance or
              have inquiries, our team is here to help. We value your patronage
              and look forward to serving you again."
            </p>
          </div>
        </Bill>
      )}

      <StyledContainer fluid>
        <Row>
          <Col>
            <Categories handleCategory={handleCategory}></Categories>
          </Col>
        </Row>
        <div className="filter">
          <input
            type="text"
            placeholder="Search Product"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="sales">
          <div className="products">
            {records &&
              records.map((product, index) => (
                <div
                  className={`product ${
                    product.quantity_in_stock === 0 ? "grayed-out" : ""
                  }`}
                  key={index}
                >
                  <div className="name">{product.name}</div>
                  <div className="price">{product.price}</div>
                  <div className="icon">
                    {product.quantity_in_stock > 0 && (
                      <FaCartPlus
                        onClick={() => handleAddToCart(product._id)}
                      ></FaCartPlus>
                    )}
                    {product.quantity_in_stock === 0 && (
                      <FaCartPlus className="disabled" />
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="side-cart">
            <div className="header">
              <div className="items">
                <span className="deleteIcon">
                  <MdDelete></MdDelete>
                </span>
                <span>Name</span>
                <span>Price</span>
                <span>Qty#</span>
                <span>Total</span>
              </div>
            </div>
            <div className="cart">
              {cartItems &&
                cartItems.map((item, index) => (
                  <div className="item" key={index}>
                    <span className="delete">
                      <MdDelete
                        onClick={() => handleRemoveFromCart(index)}
                      ></MdDelete>
                    </span>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <span>
                      <input
                        type="number"
                        className="qty"
                        min="0"
                        value={parseInt(item.quantity)}
                        onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value), index)
                        }
                      />
                    </span>
                    <span>{item.total}</span>
                  </div>
                ))}
            </div>

            <div className="total">
              <span>Total Amount: {totalAmount}</span>
              <button className="btn-pay" onClick={() => handleSale()}>
                Pay
              </button>
            </div>
          </div>
        </div>
      </StyledContainer>
      <ToastContainer></ToastContainer>
    </>
  );
};
const Bill = styled.div`
  position: absolute;
  z-index: 999;
  height: auto;
  width: 500px;
  margin: auto;
  border-radius: 5px;
  overflow-y: auto;
  left: 0;
  right: 0;

  .logo {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    img {
      width: 40%;
      height: 40%;

      @media (max-width: 760px) {
        width: 50%;
        height: 30%;
      }
    }
  }

  .icon {
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    height: 3rem;
    background-color: white;
  }
  table {
    margin-bottom: 0px;

    tr {
      td {
        border: none;
      }
    }
  }
  .footer {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1rem;
    background-color: white;

    .section {
      display: flex;
      height: 2rem;
      width: 50%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  .message {
    width: 100%;
    background-color: white;
    text-align: center;
    padding: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      width: 80%;
    }
  }
`;
const StyledContainer = styled(Container)`
  background-color: transparent;
  .filter {
    display: grid;
    grid-template-columns: 70%;
    gap: 1rem;
    padding: 0.2rem;
    border-radius: 15px;
    input {
      padding: 0.3rem;
      font-weight: 700;
      border-radius: 5px;
      border: none;
    }
  }
  .sales {
    display: grid;
    grid-template-columns: 70% 30%;
    height: 65vh;
    background-color: transparent;
    gap: 1rem;
    @media (max-width: 1224px) {
      grid-template-columns: 1fr; /* For screens smaller than 768px, switch to a single column layout */
      height: auto; /* Adjust height as needed */
    }
    .products {
      background-color: #fff;
      display: flex;
      height: 65vh;
      gap: 2rem;
      padding: 1rem;
      overflow: auto;
      flex-wrap: wrap;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 15px;

      .grayed-out {
        background-color: gray !important;
      }
      .product {
        display: flex;
        flex-direction: column;
        background-color: aliceblue;
        justify-content: center;
        align-items: center;
        height: 10rem;
        width: 10rem;
        border: 1px solid #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        .icon {
          cursor: pointer;
          font-size: 2rem;
        }
      }
    }
    .side-cart {
      display: grid;
      grid-template-rows: 10% 65% 20%;
      height: 65vh;
      background-color: aliceblue;

      .header {
        display: flex;
        gap: 1.5rem;
        overflow: auto;
        width: 100%;
        justify-content: center;
        flex-direction: column;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        font-weight: 700;

        .items {
          background-color: #6fc3fa;
          height: 4rem;
          display: flex;
          gap: 1rem;
          border-radius: 5px;
          justify-content: center;
          align-items: center;
          padding: 2rem;

          span {
            width: 8rem;
          }

          .deleteIcon {
            font-size: 2rem;
            cursor: pointer;
            color: red;
          }
        }
      }

      .cart {
        display: flex;
        gap: 1rem;
        overflow: auto;
        /* padding: 1rem; */
        width: 100%;
        justify-content: start;
        flex-direction: column;

        .item {
          background-color: #c478ff;
          height: 4rem;
          display: flex;
          gap: 1.5rem;
          border-radius: 5px;
          justify-content: center;
          align-items: center;
          padding: 2rem;

          span {
            width: 5rem;
          }

          .qty {
            width: 4rem;
            border: none;
            text-align: center;
            border-radius: 0.5rem;
          }

          .delete {
            font-size: 2rem;
            cursor: pointer;
            color: red;
          }
        }
      }
      .total {
        background-color: #6fc3fa;
        height: 3rem;
        display: flex;
        gap: 0.5rem;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        margin-top: 0.5rem;
        font-weight: bold;
        flex-direction: row;

        button {
          width: 6rem;
          background-color: #f4a0e9;
          border-radius: 5px;
          border: none;
          padding: 0.3rem;
          font-weight: bold;
        }
      }
    }
  }
`;
export default Sales;

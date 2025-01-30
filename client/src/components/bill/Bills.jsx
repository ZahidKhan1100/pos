import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills } from "../../features/bill/billSlice";
import styled from "styled-components";
import moment from "moment";
import { CiSquareRemove } from "react-icons/ci";
import Table from "react-bootstrap/Table";
import logo from "../../assets/logo.jpeg";

const Bills = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bill.bills);
  const [records, setRecords] = useState();
  const [bill, setBill] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  useEffect(() => {
    setRecords(bills);
  }, [bills]);

  const handleSearch = (value) => {
    const searchText = value.toLowerCase();

    if (searchText === " ") {
      setRecords(bills);
    } else {
      const newData = bills.filter((record) => {
        return record.name.toLowerCase().includes(searchText);
      });
      setRecords(newData);
    }
  };

  const handleBill = (id) => {
    setShow(!show);
    const findBill = bills.find((bill) => bill._id === id);
    setBill(findBill);
  };

  return (
    <>
      {show && (
        <Bill>
          <div className="icon" style={{ cursor: "pointer" }}>
            <CiSquareRemove onClick={() => setShow(!show)} />
          </div>
          <div className="logo">
            <img src={logo} alt="Logo" />
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
      <Container>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="show-bills">
          {records &&
            records.map((bill, key) => (
              <div
                className="bill"
                key={key}
                onClick={() => handleBill(bill._id)}
              >
                <span>{bill.name}</span>
                <span>{moment(bill.createdAt).format("DD-MM-YYYY")}</span>
              </div>
            ))}
        </div>
      </Container>
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

const Container = styled.div`
  height: 90vh;
  width: 100vw;
  padding: 2rem;
  display: grid;
  grid-template-rows: 10% 90%;

  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .show-bills {
    background-color: #fff;
    margin-top: 0.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .show-bills {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
    overflow: auto;

    .bill {
      display: flex;
      width: 10rem;
      background-color: aliceblue;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 6rem;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgb(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
`;
export default Bills;

import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchProducts } from "../../features/products/productSlice";

const ProductsTable = ({ handleEdit, handleDelete }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [records, setRecords] = useState(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setRecords(products);
  }, [products]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Quantity in stock",
      selector: (row) => row.quantity_in_stock,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action">
          <Button variant="info" onClick={() => handleEdit(row._id)}>
            <FaEdit />
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row._id)}>
            <MdDelete />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const handleFilter = (event) => {
    const searchText = event.target.value.toLowerCase();
    if (searchText === "") {
      setRecords(products);
    } else {
      const newData = products.filter((row) => {
        return row.name.toLowerCase().includes(searchText);
      });
      setRecords(newData);
    }
  };

  return (
    <>
      <div className="text-end">
        <label htmlFor="">Search:</label>
        <input type="text" onChange={(e) => handleFilter(e)} />
      </div>
      <DataTable
        className="table"
        columns={columns}
        data={records}
        fixedHeader
        pagination
        striped
        bordered
        highlightOnHover
      />
    </>
  );
};

export default ProductsTable;

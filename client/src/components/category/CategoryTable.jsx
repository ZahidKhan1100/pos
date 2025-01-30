import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchCategories } from "../../features/category/categorySlice";

const CategoryTable = ({ handleEdit, handleDelete }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [records, setRecords] = useState(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setRecords(categories);
  }, [categories]);

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
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
      setRecords(categories);
    } else {
      const newData = categories.filter((row) => {
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

export default CategoryTable;

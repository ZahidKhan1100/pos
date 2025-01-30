import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchEmployees } from "../../features/employee/employeeSlice";

const EmployeeTable = ({ handleEdit, handleDelete }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const [records, setRecords] = useState(employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    setRecords(employees);
  }, [employees]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
    },
    {
      name: "Role",
      selector: (row) => row.email,
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
      setRecords(employees);
    } else {
      const newData = employees.filter((row) => {
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

export default EmployeeTable;

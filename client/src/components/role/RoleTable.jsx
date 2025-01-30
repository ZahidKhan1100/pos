import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchRoles } from "../../features/role/roleSlice";

const RoleTable = ({ handleEdit, handleDelete }) => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
  const [records, setRecords] = useState(roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    setRecords(roles);
  }, [roles]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Roles",
      selector: (row) => row.permissions,
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
      setRecords(roles);
    } else {
      const newData = roles.filter((row) => {
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

export default RoleTable;
